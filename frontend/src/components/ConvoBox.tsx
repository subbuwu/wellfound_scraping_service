import React, { useState, useEffect, useRef } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface Message {
  id: string;
  body: string;
  sentAt: number;
  sender: {
    name: string;
    avatarUrl: string;
  };
}

const ConvoBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);


  useEffect(() => {
    fetchMessages();
    toast.success('Fetched all messages successfully !')
  }, []);



  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:8000/get-all-messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        toast.error('Failed to fetch messages');
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      const sortedMessages = data.data.talent.conversation.messages.edges
        .map((edge: any) => ({
          id: edge.node.id,
          body: edge.node.body,
          sentAt: edge.node.sentAt,
          sender: {
            name: edge.node.sender.name,
            avatarUrl: edge.node.sender.avatarUrl || 'https://wellfound.com/images/shared/nopic.png'
          }
        }))
        .sort((a: Message, b: Message) => a.sentAt - b.sentAt);

      setMessages(sortedMessages);
    } catch (err) {
      toast.error('Error fetching messages');
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) {
      toast.error('Message cannot be empty');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userMessage: newMessage }),
      });

      if (!response.ok) {
        toast.error('Failed to send message');
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      const sentMessage: Message = {
        id: data.data.message.id,
        body: data.data.message.body,
        sentAt: data.data.message.sentAt,
        sender: {
          name: data.data.message.sender.name,
          avatarUrl: data.data.message.sender.avatarUrl || 'https://wellfound.com/images/shared/nopic.png'
        }
      };

      setMessages([...messages, sentMessage]);
      setNewMessage('');
      toast.success('Message sent successfully');
    } catch (err) {
      toast.error('Error sending message');
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card 
      className="md:col-span-3 backdrop-blur-sm bg-white/70 
      transition-all duration-300 
      border-purple-100 border-2"
    >
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-bold text-transparent 
          bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
          Conversation Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div 
          className="h-[400px] overflow-y-auto border border-gray-200 rounded-lg p-4 
          bg-white/50 space-y-4"
        >
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex items-start space-x-3 mb-4 
                ${message.sender.name === 'Subramanian Narayanan' 
                  ? 'flex-row-reverse text-right' 
                  : 'flex-row text-left'}`}
            >
              <img 
                src={message.sender.avatarUrl} 
                alt={message.sender.name} 
                className="w-10 h-10 rounded-full object-cover"
              />
              <div 
                className={`p-3 rounded-lg max-w-[70%] 
                  ${message.sender.name === 'Subramanian Narayanan' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-blue-100 text-blue-800'}`}
              >
                <p className="text-sm font-medium mb-1">{message.sender.name}</p>
                <p className="text-sm">{message.body}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatTimestamp(message.sentAt)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex gap-2">
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 outline-none focus:border-blue-400"
            disabled={loading}
          />
          <Button
            onClick={sendMessage}
            disabled={loading}
            className={`
              ${loading ? "cursor-not-allowed" : "cursor-pointer"} 
              bg-purple-500 hover:bg-purple-600 transition-all duration-150
            `}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConvoBox;