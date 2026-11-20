(function () {
    "use strict";

    // Predefined Q&A pulled from resume/portfolio content
    const knowledgeBase = [
        {
            keywords: ["skill", "skills", "good at", "know"],
            question: "What are his skills?",
            answer: "Malusi works across HTML, CSS, JavaScript, C#, SQL/MySQL, networking, and cybersecurity fundamentals. He holds Cisco Networking Academy certificates in IoT, Cybersecurity, and Networking Communications, plus an FNB App Academy certificate."
        },
        {
            keywords: ["networking", "network"],
            question: "Has he done networking projects?",
            answer: "Yes — he holds a Cisco Networking Academy certificate in Networking Communications, and works hands-on with lab networks using tools like Wireshark and Veyon as part of his Laboratory Executive role at Summerstrand Student Village."
        },
        {
            keywords: ["cybersecurity", "security"],
            question: "Any cybersecurity experience?",
            answer: "He holds a Cisco Networking Academy Cybersecurity certificate and lists cybersecurity as one of his core interests alongside AI development and machine learning."
        },
        {
            keywords: ["study", "studying", "degree", "university", "school"],
            question: "What is he studying?",
            answer: "He's a second-year Bachelor of Information Technology (BIT) student at Nelson Mandela University (EBEIT faculty), and also takes part in the Capaciti program."
        },
        {
            keywords: ["project", "projects", "built", "app", "apps"],
            question: "What has he built?",
            answer: "Projects include NMU Wayfinder (a campus navigation app), SSSV Workflow (a lab task-management tool), and W/ASSISTANCE, an AI assistant project exploring intelligent automation."
        },
        {
            keywords: ["leadership", "lead", "leader"],
            question: "What leadership experience does he have?",
            answer: "He serves as 2IC at CRC church, leads a Homecell group, and is involved in the church's Info Desk ministry — experience that's built his communication, public speaking, and team coordination skills."
        },
        {
            keywords: ["job", "hire", "opportunity", "looking for", "role", "position"],
            question: "What kind of role is he looking for?",
            answer: "He's seeking IT opportunities, particularly help desk roles, while continuing to build skills in AI development, machine learning, and cybersecurity."
        },
        {
            keywords: ["contact", "email", "reach", "get in touch"],
            question: "How can I contact him?",
            answer: "Best way is the contact form at the bottom of this page — it goes straight to his inbox."
        },
        {
            keywords: ["resume", "cv"],
            question: "Can I see his resume?",
            answer: "Yes — there's a Download Resume button in the Resume section further up the page."
        }
    ];

    const fallback = "I don't have a specific answer for that yet — feel free to ask via the contact form and Malusi will get back to you directly!";

    function findAnswer(text) {
        const lower = text.toLowerCase();
        const match = knowledgeBase.find(item =>
            item.keywords.some(k => lower.includes(k))
        );
        return match ? match.answer : fallback;
    }

    function buildWidget() {
        const toggle = document.createElement('button');
        toggle.className = 'chat-widget-toggle';
        toggle.setAttribute('aria-label', 'Ask about me');
        toggle.innerHTML = '<i class="bi bi-chat-dots-fill"></i>';

        const panel = document.createElement('div');
        panel.className = 'chat-widget-panel';
        panel.innerHTML = `
    <div class="chat-widget-header">
      <span>Ask about Malusi</span>
      <span class="close-chat">&times;</span>
    </div>
    <div class="chat-widget-body" id="chatBody">
      <div class="chat-msg bot">Hi! Ask me anything about Malusi's skills, projects, or experience — or tap a question below.</div>
      <div class="chat-quick-replies" id="quickReplies"></div>
    </div>
    <div class="chat-widget-input">
      <input type="text" id="chatInput" placeholder="Type a question...">
      <button id="chatSend"><i class="bi bi-send"></i></button>
    </div>
  `;

        document.body.appendChild(toggle);
        document.body.appendChild(panel);

        const body = panel.querySelector('#chatBody');
        const quickReplies = panel.querySelector('#quickReplies');
        const input = panel.querySelector('#chatInput');
        const sendBtn = panel.querySelector('#chatSend');

        // Render quick reply buttons INSIDE the scrolling body, not pinned outside it
        knowledgeBase.forEach(item => {
            const btn = document.createElement('button');
            btn.textContent = item.question;
            btn.addEventListener('click', () => handleMessage(item.question));
            quickReplies.appendChild(btn);
        });

        function scrollToBottom() {
            requestAnimationFrame(() => {
                body.scrollTop = body.scrollHeight;
            });
        }

        function addMessage(text, sender) {
            const msg = document.createElement('div');
            msg.className = `chat-msg ${sender}`;
            msg.textContent = text;
            body.appendChild(msg);
            scrollToBottom();
        }

        function handleMessage(text) {
            if (!text.trim()) return;

            // Hide the quick-reply chips once a real conversation starts
            if (quickReplies.style.display !== 'none') {
                quickReplies.style.display = 'none';
            }

            addMessage(text, 'user');
            scrollToBottom();

            setTimeout(() => {
                addMessage(findAnswer(text), 'bot');
                scrollToBottom();
            }, 300);

            input.value = '';
        }

        toggle.addEventListener('click', () => {
            panel.classList.toggle('open');
            if (panel.classList.contains('open')) scrollToBottom();
        });
        panel.querySelector('.close-chat').addEventListener('click', () => panel.classList.remove('open'));
        sendBtn.addEventListener('click', () => handleMessage(input.value));
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleMessage(input.value);
        });
    }

    document.addEventListener('DOMContentLoaded', buildWidget);
})();