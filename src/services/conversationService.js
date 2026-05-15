import { getSupabase } from '../lib/supabase';

// Get all conversations for current user, ordered by most recent
export async function getConversations() {
  try {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('conversations')
      .select('id, title, created_at, updated_at')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('[Conversation Service] Error fetching conversations:', error.message);
    return [];
  }
}

// Create new conversation with title
export async function createConversation(title) {
  try {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('conversations')
      .insert([
        {
          user_id: user.id,
          title: title || 'New Chat'
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('[Conversation Service] Error creating conversation:', error.message);
    return null;
  }
}

// Update conversation title
export async function updateConversationTitle(conversationId, newTitle) {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('conversations')
      .update({ title: newTitle, updated_at: new Date().toISOString() })
      .eq('id', conversationId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('[Conversation Service] Error updating conversation title:', error.message);
    return null;
  }
}

// Delete conversation (cascades to messages)
export async function deleteConversation(conversationId) {
  try {
    const supabase = getSupabase();
    const { error } = await supabase
      .from('conversations')
      .delete()
      .eq('id', conversationId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('[Conversation Service] Error deleting conversation:', error.message);
    return false;
  }
}

// Get all messages for a conversation
export async function getMessages(conversationId) {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('messages')
      .select('id, role, content, created_at')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('[Conversation Service] Error fetching messages:', error.message);
    return [];
  }
}

// Save message to conversation
export async function saveMessage(conversationId, role, content) {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          conversation_id: conversationId,
          role: role,
          content: content
        }
      ])
      .select()
      .single();

    if (error) throw error;

    // Update conversation updated_at timestamp
    await supabase
      .from('conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conversationId);

    return data;
  } catch (error) {
    console.error('[Conversation Service] Error saving message:', error.message);
    return null;
  }
}

// Helper: Extract first 40 characters for title from message
export function generateTitleFromMessage(message) {
  return message.substring(0, 40).trim();
}

// Helper: Group conversations by date
export function groupConversationsByDate(conversations) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  const groups = {
    today: [],
    yesterday: [],
    thisWeek: [],
    older: []
  };

  conversations.forEach(conv => {
    const convDate = new Date(conv.created_at);
    const convDateOnly = new Date(convDate.getFullYear(), convDate.getMonth(), convDate.getDate());

    if (convDateOnly.getTime() === today.getTime()) {
      groups.today.push(conv);
    } else if (convDateOnly.getTime() === yesterday.getTime()) {
      groups.yesterday.push(conv);
    } else if (convDateOnly.getTime() > weekAgo.getTime()) {
      groups.thisWeek.push(conv);
    } else {
      groups.older.push(conv);
    }
  });

  return groups;
}
