// CannaBiz HR Chatbot - Cannabis HR Consulting Assistant
// Intelligent chatbot for cannabis industry HR questions

class CannaBizChatbot {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];
        this.responses = this.initializeResponses();
        this.currentStep = null;
        this.userContext = {};
        
        this.initializeElements();
        this.bindEvents();
        this.addInitialMessage();
    }
    
    initializeElements() {
        this.container = document.getElementById('chatbot-container');
        this.toggle = document.getElementById('chatbot-toggle');
        this.minimizeBtn = document.getElementById('chatbot-minimize');
        this.messagesContainer = document.getElementById('chatbot-messages');
        this.inputField = document.getElementById('chatbot-input-field');
        this.sendBtn = document.getElementById('chatbot-send');
        
        if (!this.container || !this.toggle) {
            console.warn('Chatbot elements not found');
            return;
        }
    }
    
    bindEvents() {
        // Toggle chatbot
        this.toggle?.addEventListener('click', () => this.toggleChatbot());
        this.minimizeBtn?.addEventListener('click', () => this.toggleChatbot());
        
        // Send message
        this.sendBtn?.addEventListener('click', () => this.sendMessage());
        this.inputField?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        // Close chatbot when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !this.container?.contains(e.target) && 
                !this.toggle?.contains(e.target)) {
                this.closeChatbot();
            }
        });
    }
    
    initializeResponses() {
        return {
            // Greeting and general responses
            greetings: [
                "Hello! I'm here to help with your cannabis HR and compliance questions. What can I assist you with today?",
                "Hi there! Welcome to CannaBiz HR. How can I help you with your cannabis business HR needs?",
                "Greetings! I'm your cannabis HR assistant. What questions do you have about compliance or HR management?"
            ],
            
            // Cannabis compliance topics
            compliance: {
                keywords: ['compliance', 'regulation', 'license', 'licensing', 'legal', 'law', 'permit', 'application'],
                responses: [
                    "Cannabis compliance is our specialty! We help with licensing applications, regulatory requirements, and ongoing compliance management. Are you looking for help with a specific license type or compliance issue?",
                    "I can help you understand cannabis compliance requirements. What specific area are you concerned about - licensing, employment law, or operational compliance?",
                    "Our municipal government experience gives us unique insights into cannabis compliance. What compliance challenge are you facing?"
                ],
                followUp: [
                    "Would you like to schedule a free consultation to discuss your specific compliance needs?",
                    "Are you dealing with a licensing application or renewal process?",
                    "Do you need help with compliance policies and procedures?"
                ]
            },
            
            // HR management topics
            hr: {
                keywords: ['hr', 'human resources', 'employee', 'hiring', 'recruitment', 'training', 'handbook', 'policy'],
                responses: [
                    "HR management for cannabis businesses requires specialized knowledge. We can help with recruitment, policy development, training programs, and employee relations. What HR challenge are you facing?",
                    "Our HR services are tailored specifically for the cannabis industry. Are you looking for help with hiring, employee handbooks, training, or something else?",
                    "Cannabis HR has unique requirements compared to traditional industries. What specific HR area would you like to discuss?"
                ],
                followUp: [
                    "Are you looking to develop employee policies and procedures?",
                    "Do you need help with recruitment and background screening processes?",
                    "Would training programs for your team be helpful?"
                ]
            },
            
            // Technology solutions
            technology: {
                keywords: ['technology', 'tech', 'software', 'system', 'hris', 'website', 'web', 'development', 'data', 'analytics'],
                responses: [
                    "We develop custom technology solutions for cannabis businesses! This includes HRIS systems, compliance tracking tools, websites, and data analysis platforms. What type of technology solution are you interested in?",
                    "Our technology services include web development, HRIS implementation, and compliance software. What specific tech challenge are you trying to solve?",
                    "Technology can streamline cannabis business operations significantly. Are you looking for compliance tracking, employee management systems, or custom development?"
                ],
                followUp: [
                    "Would a custom HRIS system help manage your employee data and compliance?",
                    "Are you interested in automated compliance reporting tools?",
                    "Do you need a professional website for your cannabis business?"
                ]
            },
            
            // Los Angeles County specific
            losAngeles: {
                keywords: ['la', 'los angeles', 'county', 'california', 'ca', 'local', 'municipal'],
                responses: [
                    "We're based in Los Angeles County and have extensive experience with local cannabis regulations! Our municipal government background gives us unique insights into LA County requirements. What specific local compliance question do you have?",
                    "LA County has specific cannabis regulations that we know well. Are you dealing with local licensing, zoning, or operational requirements?",
                    "Our Los Angeles County expertise includes relationships with local government and understanding of municipal requirements. How can we help with your local compliance needs?"
                ],
                followUp: [
                    "Are you working on a LA County cannabis license application?",
                    "Do you need help understanding local employment requirements?",
                    "Would you like guidance on working with LA County regulators?"
                ]
            },
            
            // Pricing and services
            pricing: {
                keywords: ['price', 'cost', 'fee', 'rate', 'expensive', 'affordable', 'free', 'consultation'],
                responses: [
                    "We offer free initial consultations to understand your needs and provide value upfront! Our pricing depends on the specific services required. Would you like to schedule a free 30-minute consultation to discuss your needs?",
                    "Every cannabis business has unique needs, so we provide customized pricing. We always start with a complimentary consultation. Would you like to schedule yours today?",
                    "Our services are competitively priced for the cannabis industry, and we begin with a free consultation. What specific services are you interested in learning about?"
                ],
                followUp: [
                    "Would you like to schedule your free consultation today?",
                    "Are you interested in ongoing support or project-based assistance?",
                    "What's your timeline for implementing HR or compliance solutions?"
                ]
            },
            
            // Contact and scheduling
            contact: {
                keywords: ['contact', 'schedule', 'appointment', 'meeting', 'call', 'phone', 'email'],
                responses: [
                    "I'd be happy to help you get in touch! You can schedule a free consultation through our contact page, call us at (555) 123-4567, or email info@cannabizhr.com. What works best for you?",
                    "To schedule your free consultation, you can visit our contact page or call us directly. We typically respond within 24 hours. Would you prefer a phone call or video meeting?",
                    "Let's get you connected with our cannabis HR expert! You can reach us through our contact form, by phone, or email. What's your preferred contact method?"
                ],
                followUp: [
                    "Would you like me to direct you to our contact form?",
                    "Are you available for a consultation this week?",
                    "Do you have any urgent compliance questions that need immediate attention?"
                ]
            },
            
            // Background check and licensing
            background: {
                keywords: ['background', 'check', 'screening', 'criminal', 'fingerprint', 'livescan'],
                responses: [
                    "Background checks for cannabis employees have specific requirements that vary by license type and location. We can help you implement compliant screening processes. What type of cannabis license do you have?",
                    "Cannabis employee background screening is critical for compliance. Our municipal government experience helps us navigate these requirements effectively. Are you setting up initial screening or updating current processes?",
                    "Background check requirements for cannabis businesses are complex but manageable with the right guidance. We can help develop compliant screening procedures. What's your current situation?"
                ],
                followUp: [
                    "Do you need help developing background check policies?",
                    "Are you dealing with specific screening requirements for your license type?",
                    "Would training on background check compliance be helpful for your team?"
                ]
            },
            
            // Training and education
            training: {
                keywords: ['training', 'education', 'learn', 'program', 'course', 'certification'],
                responses: [
                    "We develop comprehensive training programs for cannabis businesses covering compliance, safety, customer service, and professional development. What type of training would benefit your team most?",
                    "Training is crucial for cannabis business success and compliance. We can create customized programs for your specific needs. Are you looking for compliance training, operational training, or professional development?",
                    "Our training programs combine industry best practices with compliance requirements. What areas would you like your team to be better trained in?"
                ],
                followUp: [
                    "Would compliance training help your team stay current with regulations?",
                    "Are you interested in customer service training specific to cannabis retail?",
                    "Do you need management training for cannabis operations?"
                ]
            },
            
            // Municipal government experience
            government: {
                keywords: ['government', 'municipal', 'public', 'sector', 'mpa', 'experience'],
                responses: [
                    "Our founder has extensive municipal government experience with an MPA degree, providing unique insights into regulatory expectations and compliance best practices. This background helps us understand both sides of the compliance equation. How can this expertise help your business?",
                    "Municipal government experience gives us a unique perspective on how regulators think and what they expect from cannabis businesses. We can help you build positive relationships with oversight agencies. What regulatory challenges are you facing?",
                    "Our public administration background helps cannabis businesses understand and exceed regulatory expectations. We know how to work effectively with government agencies. Are you dealing with regulatory relationships or compliance concerns?"
                ],
                followUp: [
                    "Would guidance on working with regulators be valuable for your business?",
                    "Do you need help understanding regulator expectations?",
                    "Are you looking to build better relationships with oversight agencies?"
                ]
            },
            
            // Emergency or urgent responses
            urgent: {
                keywords: ['urgent', 'emergency', 'immediate', 'asap', 'help', 'problem', 'issue'],
                responses: [
                    "I understand you have an urgent need! For immediate assistance, please call us directly at (555) 123-4567. We prioritize urgent compliance and HR matters. What specific issue are you dealing with?",
                    "Urgent cannabis compliance issues need immediate attention. Please contact us directly for priority support. What type of urgent matter are you facing?",
                    "For urgent matters, direct contact is best. Call (555) 123-4567 or email info@cannabizhr.com with 'URGENT' in the subject line. Can you tell me more about the situation?"
                ],
                followUp: [
                    "Is this related to a regulatory deadline or compliance issue?",
                    "Do you need immediate guidance on a specific problem?",
                    "Would a same-day consultation be helpful?"
                ]
            },
            
            // Fallback responses
            fallback: [
                "I want to make sure I understand your question correctly. Could you provide more details about what you're looking for help with?",
                "That's an interesting question! While I can provide general guidance, our cannabis HR expert would be better equipped to give you specific advice. Would you like to schedule a free consultation?",
                "I'd like to connect you with our cannabis HR specialist who can provide detailed guidance on your specific situation. Would you like to schedule a consultation?",
                "Let me make sure I can get you the best answer. Could you rephrase your question or tell me more about your specific situation?",
                "For detailed guidance on complex cannabis HR and compliance matters, I recommend speaking with our expert directly. Would you like to schedule a free consultation?"
            ],
            
            // Goodbye responses
            goodbye: [
                "Thank you for chatting with me! If you have more questions, feel free to return anytime or schedule a free consultation. Have a great day!",
                "It was great helping you today! Remember, we offer free consultations to discuss your specific needs. Take care!",
                "Thanks for visiting CannaBiz HR! Don't hesitate to reach out if you need professional cannabis HR guidance. Goodbye!"
            ]
        };
    }
    
    addInitialMessage() {
        if (!this.messagesContainer) return;
        
        const greeting = this.getRandomResponse(this.responses.greetings);
        this.addMessage(greeting, 'bot');
        
        // Add quick action buttons
        setTimeout(() => {
            this.addQuickActions([
                'Cannabis Compliance',
                'HR Management',
                'Technology Solutions',
                'Free Consultation'
            ]);
        }, 1000);
    }
    
    toggleChatbot() {
        if (!this.container) return;
        
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            this.openChatbot();
        } else {
            this.closeChatbot();
        }
    }
    
    openChatbot() {
        if (!this.container) return;
        
        this.container.style.display = 'flex';
        this.isOpen = true;
        
        // Focus on input field
        setTimeout(() => {
            this.inputField?.focus();
        }, 300);
        
        // Track engagement
        this.trackEvent('Chatbot', 'Open');
    }
    
    closeChatbot() {
        if (!this.container) return;
        
        this.container.style.display = 'none';
        this.isOpen = false;
        
        this.trackEvent('Chatbot', 'Close');
    }
    
    sendMessage() {
        const message = this.inputField?.value.trim();
        if (!message) return;
        
        // Add user message
        this.addMessage(message, 'user');
        this.conversationHistory.push({ type: 'user', message, timestamp: Date.now() });
        
        // Clear input
        if (this.inputField) {
            this.inputField.value = '';
        }
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Process message and respond
        setTimeout(() => {
            this.hideTypingIndicator();
            this.processMessage(message);
        }, Math.random() * 1000 + 500); // Random delay for natural feel
        
        this.trackEvent('Chatbot', 'Message Sent', message);
    }
    
    addMessage(text, sender = 'bot') {
        if (!this.messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageText = document.createElement('p');
        messageText.textContent = text;
        messageDiv.appendChild(messageText);
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Add to conversation history
        if (sender === 'bot') {
            this.conversationHistory.push({ type: 'bot', message: text, timestamp: Date.now() });
        }
    }
    
    addQuickActions(actions) {
        if (!this.messagesContainer) return;
        
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'message bot-message quick-actions';
        actionsDiv.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            padding: 1rem;
        `;
        
        const actionsTitle = document.createElement('p');
        actionsTitle.textContent = 'Quick topics:';
        actionsTitle.style.margin = '0 0 0.5rem 0';
        actionsTitle.style.fontWeight = '600';
        actionsDiv.appendChild(actionsTitle);
        
        actions.forEach(action => {
            const button = document.createElement('button');
            button.textContent = action;
            button.style.cssText = `
                padding: 0.5rem 1rem;
                border: 2px solid hsl(120, 25%, 35%);
                background-color: white;
                color: hsl(120, 25%, 35%);
                border-radius: 6px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.3s ease;
            `;
            
            button.addEventListener('click', () => {
                this.handleQuickAction(action);
                actionsDiv.remove(); // Remove quick actions after selection
            });
            
            button.addEventListener('mouseenter', () => {
                button.style.backgroundColor = 'hsl(120, 25%, 35%)';
                button.style.color = 'white';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.backgroundColor = 'white';
                button.style.color = 'hsl(120, 25%, 35%)';
            });
            
            actionsDiv.appendChild(button);
        });
        
        this.messagesContainer.appendChild(actionsDiv);
        this.scrollToBottom();
    }
    
    handleQuickAction(action) {
        // Add user message for the action
        this.addMessage(action, 'user');
        
        // Process the action as a message
        this.processMessage(action.toLowerCase());
        
        this.trackEvent('Chatbot', 'Quick Action', action);
    }
    
    processMessage(message) {
        const lowerMessage = message.toLowerCase();
        let response = '';
        let followUp = [];
        
        // Check for goodbye/exit intent
        if (this.containsKeywords(lowerMessage, ['bye', 'goodbye', 'exit', 'quit', 'thanks', 'thank you'])) {
            response = this.getRandomResponse(this.responses.goodbye);
            this.addMessage(response, 'bot');
            return;
        }
        
        // Check for urgent keywords first
        if (this.containsKeywords(lowerMessage, this.responses.urgent.keywords)) {
            response = this.getRandomResponse(this.responses.urgent.responses);
            followUp = this.responses.urgent.followUp;
        }
        // Check for specific topics
        else if (this.containsKeywords(lowerMessage, this.responses.compliance.keywords)) {
            response = this.getRandomResponse(this.responses.compliance.responses);
            followUp = this.responses.compliance.followUp;
            this.userContext.topic = 'compliance';
        }
        else if (this.containsKeywords(lowerMessage, this.responses.hr.keywords)) {
            response = this.getRandomResponse(this.responses.hr.responses);
            followUp = this.responses.hr.followUp;
            this.userContext.topic = 'hr';
        }
        else if (this.containsKeywords(lowerMessage, this.responses.technology.keywords)) {
            response = this.getRandomResponse(this.responses.technology.responses);
            followUp = this.responses.technology.followUp;
            this.userContext.topic = 'technology';
        }
        else if (this.containsKeywords(lowerMessage, this.responses.losAngeles.keywords)) {
            response = this.getRandomResponse(this.responses.losAngeles.responses);
            followUp = this.responses.losAngeles.followUp;
            this.userContext.location = 'la';
        }
        else if (this.containsKeywords(lowerMessage, this.responses.pricing.keywords)) {
            response = this.getRandomResponse(this.responses.pricing.responses);
            followUp = this.responses.pricing.followUp;
        }
        else if (this.containsKeywords(lowerMessage, this.responses.contact.keywords)) {
            response = this.getRandomResponse(this.responses.contact.responses);
            followUp = this.responses.contact.followUp;
        }
        else if (this.containsKeywords(lowerMessage, this.responses.background.keywords)) {
            response = this.getRandomResponse(this.responses.background.responses);
            followUp = this.responses.background.followUp;
        }
        else if (this.containsKeywords(lowerMessage, this.responses.training.keywords)) {
            response = this.getRandomResponse(this.responses.training.responses);
            followUp = this.responses.training.followUp;
        }
        else if (this.containsKeywords(lowerMessage, this.responses.government.keywords)) {
            response = this.getRandomResponse(this.responses.government.responses);
            followUp = this.responses.government.followUp;
        }
        // Greetings
        else if (this.containsKeywords(lowerMessage, ['hello', 'hi', 'hey', 'greetings'])) {
            response = this.getRandomResponse(this.responses.greetings);
        }
        // Fallback response
        else {
            response = this.getRandomResponse(this.responses.fallback);
        }
        
        // Add main response
        this.addMessage(response, 'bot');
        
        // Add follow-up question if available
        if (followUp.length > 0) {
            setTimeout(() => {
                const followUpQuestion = this.getRandomResponse(followUp);
                this.addMessage(followUpQuestion, 'bot');
                
                // Add relevant quick actions based on topic
                this.addContextualQuickActions();
            }, 1500);
        }
    }
    
    addContextualQuickActions() {
        const actions = [];
        
        if (this.userContext.topic === 'compliance') {
            actions.push('Schedule Consultation', 'License Help', 'Compliance Audit');
        } else if (this.userContext.topic === 'hr') {
            actions.push('Employee Handbook', 'Hiring Process', 'Training Programs');
        } else if (this.userContext.topic === 'technology') {
            actions.push('HRIS Systems', 'Web Development', 'Data Analysis');
        } else {
            actions.push('Free Consultation', 'Contact Us', 'Learn More');
        }
        
        if (actions.length > 0) {
            setTimeout(() => {
                this.addQuickActions(actions);
            }, 500);
        }
    }
    
    containsKeywords(message, keywords) {
        return keywords.some(keyword => message.includes(keyword));
    }
    
    getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    showTypingIndicator() {
        if (!this.messagesContainer) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.innerHTML = '<p>CannaBiz HR is typing...</p>';
        typingDiv.style.fontStyle = 'italic';
        typingDiv.style.opacity = '0.7';
        
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        const typingIndicator = this.messagesContainer?.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    scrollToBottom() {
        if (this.messagesContainer) {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }
    }
    
    trackEvent(category, action, label = null) {
        // Analytics tracking
        if (typeof window.trackEvent === 'function') {
            window.trackEvent(category, action, label);
        } else {
            console.log('Chatbot Event:', { category, action, label });
        }
    }
    
    // Method to get conversation summary for analytics
    getConversationSummary() {
        return {
            messageCount: this.conversationHistory.length,
            duration: this.conversationHistory.length > 0 ? 
                Date.now() - this.conversationHistory[0].timestamp : 0,
            topics: Object.keys(this.userContext),
            context: this.userContext
        };
    }
    
    // Method to reset conversation
    resetConversation() {
        this.conversationHistory = [];
        this.userContext = {};
        this.currentStep = null;
        
        if (this.messagesContainer) {
            this.messagesContainer.innerHTML = '';
        }
        
        this.addInitialMessage();
    }
    
    // Method to export conversation (for support purposes)
    exportConversation() {
        return {
            timestamp: new Date().toISOString(),
            messages: this.conversationHistory,
            context: this.userContext,
            summary: this.getConversationSummary()
        };
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if chatbot elements exist before initializing
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    
    if (chatbotContainer && chatbotToggle) {
        window.cannabizChatbot = new CannaBizChatbot();
        console.log('CannaBiz HR Chatbot initialized successfully');
    } else {
        console.log('Chatbot elements not found - chatbot not initialized');
    }
});

// Export for potential testing or external access
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CannaBizChatbot;
}
