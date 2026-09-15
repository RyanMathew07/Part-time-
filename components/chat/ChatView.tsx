'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { sounds } from '@/lib/soundEngine';
import { QuickActionChips } from './QuickActionChips';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  SendIcon,
  Call02Icon,
  ArrowLeft01Icon,
  Search01Icon,
  TickDouble02Icon,
  Building01Icon,
} from '@hugeicons/core-free-icons';

export function ChatView() {
  const {
    chats,
    activeChatId,
    setActiveChatId,
    sendMessage,
    showToast,
  } = useMarketplace();

  const [inputMessage, setInputMessage] = useState('');
  const [chatSearch, setChatSearch] = useState('');
  const [showMobileThread, setShowMobileThread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const activeContact =
    chats.find((c) => c.id === activeChatId) || chats[0];

  const filteredContacts = chats.filter(
    (c) =>
      c.contactName.toLowerCase().includes(chatSearch.toLowerCase()) ||
      c.company.toLowerCase().includes(chatSearch.toLowerCase()) ||
      c.jobReference.toLowerCase().includes(chatSearch.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeContact?.messages]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim()) return;
    sendMessage(activeContact.id, inputMessage);
    setInputMessage('');
  };

  const handleQuickChipAction = (text: string) => {
    sendMessage(activeContact.id, text);
  };

  const handleSelectContact = (id: string) => {
    sounds.playTap();
    setActiveChatId(id);
    setShowMobileThread(true);
  };

  const handleCallSimulation = () => {
    sounds.playTap();
    showToast(
      `Calling ${activeContact.contactName} (${activeContact.company})...`,
      'phone'
    );
  };

  return (
    <Card className="w-full h-[640px] md:h-[720px] bg-white border border-[#efefef] dark:bg-[#121212] dark:border-[#282828] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-sm text-black dark:text-white font-sans p-0 gap-0">
      {/* Left Pane: Contacts List */}
      <div
        className={`w-full md:w-80 md:border-r border-[#efefef] dark:border-[#282828] flex flex-col bg-white dark:bg-[#121212] ${
          showMobileThread ? 'hidden md:flex' : 'flex'
        }`}
      >
        {/* Search Contacts */}
        <div className="p-3 border-b border-[#efefef] dark:border-[#282828]">
          <div className="relative">
            <HugeiconsIcon icon={Search01Icon} className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5e5e5e] dark:text-[#afafaf] z-10" />
            <Input
              type="text"
              value={chatSearch}
              onChange={(e) => setChatSearch(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-9 pr-3 py-2 h-auto bg-[#efefef] dark:bg-[#1a1a1a] text-xs text-black dark:text-white placeholder-[#afafaf] dark:placeholder-[#707070] rounded-full border border-transparent focus:outline-none focus:border-black dark:focus:border-white transition-colors"
            />
          </div>
        </div>

        {/* Contact Items */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#efefef] dark:divide-[#282828]">
          {filteredContacts.map((contact) => {
            const isActive = contact.id === activeContact?.id;
            const lastMsg =
              contact.messages[contact.messages.length - 1] || {
                text: 'No messages yet',
                time: contact.lastMessageTime,
              };

            return (
              <Button
                variant="ghost"
                key={contact.id}
                onClick={() => handleSelectContact(contact.id)}
                className={`w-full p-3.5 h-auto flex items-start gap-3 text-left transition-colors justify-start rounded-none border-0 ${
                  isActive
                    ? 'bg-[#efefef] dark:bg-[#1a1a1a]'
                    : 'hover:bg-[#f3f3f3] bg-transparent dark:hover:bg-[#181818]'
                }`}
              >
                <div className="relative shrink-0">
                  <Avatar className="w-10 h-10 rounded-full border border-[#efefef] dark:border-[#282828]">
                    <AvatarImage src={contact.avatar} alt={contact.contactName} className="object-cover" />
                    <AvatarFallback className="bg-[#efefef] text-black text-xs font-medium dark:bg-[#1a1a1a] dark:text-white">
                      {contact.contactName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`w-2.5 h-2.5 rounded-full absolute -bottom-0.5 -right-0.5 border-2 border-white dark:border-[#121212] ${
                      contact.status === 'online'
                        ? 'bg-black dark:bg-white'
                        : 'bg-[#afafaf]'
                    }`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-medium text-black dark:text-white truncate leading-tight">
                      {contact.contactName}
                    </span>
                    <span className="text-[10px] text-[#5e5e5e] dark:text-[#afafaf] shrink-0 font-mono">
                      {lastMsg.time || contact.lastMessageTime}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#5e5e5e] dark:text-[#afafaf] flex items-center gap-1 mb-1 truncate font-normal">
                    <HugeiconsIcon icon={Building01Icon} className="w-2.5 h-2.5 shrink-0 text-[#afafaf] dark:text-[#5e5e5e]" />
                    <span className="truncate">{contact.company}</span>
                  </div>
                  <p className="text-[11px] text-[#5e5e5e] dark:text-[#afafaf] truncate font-normal">
                    {lastMsg.text}
                  </p>
                </div>

                {contact.unreadCount > 0 && (
                  <Badge className="px-1.5 py-0.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-[9px] font-mono font-medium shrink-0 border-0">
                    {contact.unreadCount}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Right Pane: Active Thread */}
      <div
        className={`flex-1 flex flex-col bg-white dark:bg-[#121212] ${
          showMobileThread ? 'flex' : 'hidden md:flex'
        }`}
      >
        {/* Thread Header */}
        <div className="px-4 py-3 border-b border-[#efefef] dark:border-[#282828] flex items-center justify-between gap-3 bg-white dark:bg-[#121212]">
          <div className="flex items-center gap-3">
            {showMobileThread && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowMobileThread(false)}
                className="md:hidden p-1 w-8 h-8 rounded-full text-black dark:text-white hover:bg-[#efefef] dark:hover:bg-[#1a1a1a] border-0"
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} className="w-5 h-5" />
              </Button>
            )}

            <div className="relative">
              <Avatar className="w-9 h-9 rounded-full border border-[#efefef] dark:border-[#282828]">
                <AvatarImage src={activeContact.avatar} alt={activeContact.contactName} className="object-cover" />
                <AvatarFallback className="bg-[#efefef] text-black text-xs font-medium dark:bg-[#1a1a1a] dark:text-white">
                  {activeContact.contactName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div
                className={`w-2 h-2 rounded-full absolute -bottom-0.5 -right-0.5 border border-white dark:border-[#121212] ${
                  activeContact.status === 'online'
                    ? 'bg-black dark:bg-white'
                    : 'bg-[#afafaf]'
                }`}
              />
            </div>

            <div>
              <h3 className="text-xs font-bold text-black dark:text-white leading-tight">
                {activeContact.contactName}
              </h3>
              <div className="flex items-center gap-2 text-[11px] text-[#5e5e5e] dark:text-[#afafaf]">
                <span>{activeContact.company}</span>
                <span>•</span>
                <span className="text-black dark:text-white font-medium">
                  {activeContact.jobReference}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCallSimulation}
              aria-label="Call contact"
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-[#efefef] hover:bg-[#e2e2e2] text-black dark:bg-[#1a1a1a] dark:hover:bg-[#242424] dark:text-white flex items-center justify-center transition-transform duration-150 ease-out active:scale-[0.98] border-0"
            >
              <HugeiconsIcon icon={Call02Icon} className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
          {activeContact.messages.map((msg) => {
            const isUser = msg.sender === 'me';

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  isUser ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                    isUser
                      ? 'bg-black text-white rounded-tr-none shadow-sm font-normal dark:bg-white dark:text-black'
                      : 'bg-[#efefef] text-black rounded-tl-none font-normal dark:bg-[#1a1a1a] dark:text-white'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <div className="flex items-center gap-1 mt-1 px-1 text-[10px] text-[#afafaf] font-mono">
                  <span>{msg.time}</span>
                  {isUser && <HugeiconsIcon icon={TickDouble02Icon} className="w-3 h-3 text-black dark:text-white" />}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Action Chips & Input Form */}
        <div className="p-3 border-t border-[#efefef] dark:border-[#282828] bg-white dark:bg-[#121212] flex flex-col gap-2">
          <QuickActionChips onSelectAction={handleQuickChipAction} />

          <form onSubmit={handleSend} className="flex items-center gap-2">
            <Input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Message ${activeContact.contactName}...`}
              className="flex-1 px-4 py-2.5 h-auto bg-[#efefef] text-xs text-black placeholder-[#afafaf] rounded-full border border-transparent focus:outline-none focus:border-black dark:bg-[#1a1a1a] dark:text-white dark:placeholder-[#707070] dark:focus:border-white transition-colors"
            />
            <Button
              type="submit"
              disabled={!inputMessage.trim()}
              aria-label="Send message"
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-black text-white hover:bg-[#282828] dark:bg-white dark:text-black dark:hover:bg-[#e2e2e2] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-transform duration-150 ease-out shadow-sm active:scale-95 border-0 p-0"
            >
              <HugeiconsIcon icon={SendIcon} className="w-4 h-4 text-white dark:text-black" />
            </Button>
          </form>
        </div>
      </div>
    </Card>
  );
}
