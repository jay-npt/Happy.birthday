document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const nameEntrySection = document.getElementById('name-entry');
    const specialMessageSection = document.getElementById('special-message');
    const messageGallery = document.getElementById('message-gallery');
    const userNameInput = document.getElementById('user-name');
    const continueBtn = document.getElementById('continue-btn');
    const viewMessagesBtn = document.getElementById('view-messages-btn');
    const bgMusic = document.getElementById('bg-music');
    
    // Messages data
    const messages = [
        {
            img: 'img2.png',
            text: 'Happy Birthday Sunu… Aaj ka din sirf tumhara hai, jaise mera har din sirf tumhare liye hai. Tum mein hi mera sukoon hai, meri muskurahat hai, mera pyaar hai. Har saal, har janam tum meri hi raho — bas yahi dua karta hoon. Main tumse lafzon se zyada, waqt se zyada, zindagi se zyada pyaar karta hoon.'
        },
        {
            img: 'img3.png',
            text: 'Happy Birthday meri jaan, Kabhi kabhi tum dard deti ho, par us dard mein bhi tumhara naam hota hai. Main toot padta hoon, par phir bhi tum mein hi jeena chahta hoon. Tum sirf mera pyaar nahi ho, meri aadat ban chuki ho. Galti tumhari ho ya na ho, main khud ko sirf tum mein hi dhoondta hoon.'
        },
        {
            img: '/img4.png',
            text: 'Janamdin mubarak ho meri sanskari pari, Mujhe na gifts chahiye, na cake, na dikhawa — Bas tumhara vishwas, ek dil jo sirf mera ho. Main har kadam tumhare saath hoon, har faisle mein tumhara saathi hoon. Bas tum loyal rehna… kyunki meri poori duniya tum ho.'
        },
        {
            img: '/img5.png',
            text: 'Happy Birthday meri hone wali biwi, Sochta hoon jab tum meri zindagi mein hamesha ke liye aayogi, Toh har din tumhara birthday ban jaayega. Main tumhe har wo khushi dunga jiska tumne kabhi sapna dekha tha. Tumhara haath pakadkar tumhe poori duniya dikhana chahta hoon — Sharafat aur izzat ke saath.'
        },
        {
            img: '/img6.png',
            text: 'Sunu, Kabhi tum galti karti ho, toh main gussa ho jaata hoon. Kabhi lafz tez ho jaate hain… lekin mera pyaar kabhi kam nahi hota. Main tumse ladta hoon, samjhaata hoon — kyunki main tumhe khona nahi chahta. Happy Birthday meri jiddi, lekin pyaari si jaan, Gussa bhi tum pe, aur pyaar bhi sirf tum se.'
        },
        {
            img: '/img7.png',
            text: 'Tere is khaas din pe ek wada karta hoon — Main tumhe kabhi chhodunga nahi… Lekin tum bhi mujhe kabhi todna mat. Main tumhe pyaar dunga, vishwas dunga, izzat dunga — Bas tum meri zindagi mein hamesha meri apni rehna. Happy Birthday meri zindagi, Tumhara naam mere dil pe likha hai — Jise na waqt mita sakta hai, na koi aur.'
        }
    ];

    // Check if name is already saved
    const savedName = localStorage.getItem('birthdayUserName');
    if (savedName) {
        userNameInput.value = savedName;
    }

    // Continue Button Click Handler
    continueBtn.addEventListener('click', function() {
        const userName = userNameInput.value.trim();
        
        if (userName === '') {
            userNameInput.style.boxShadow = '0 0 10px red';
            setTimeout(() => {
                userNameInput.style.boxShadow = 'none';
            }, 1000);
            return;
        }
        
        // Save name to localStorage
        localStorage.setItem('birthdayUserName', userName);
        
        // Start music
        bgMusic.play().catch(e => {
            console.log('Autoplay prevented. Please click to play.');
        });
        
        // Hide name entry, show special message
        nameEntrySection.classList.add('hidden');
        specialMessageSection.classList.remove('hidden');
        
        // Create confetti
        createConfetti();
        
        // Type the special message
        typeSpecialMessage(userName);
    });

    // View Messages Button Click Handler
    viewMessagesBtn.addEventListener('click', function() {
        // Scroll to message gallery
        messageGallery.scrollIntoView({ behavior: 'smooth' });
        
        // Build message gallery
        buildMessageGallery();
    });

    // Function to type the special message
    function typeSpecialMessage(name) {
        const typedMessage = document.getElementById('typed-message');
        
        const specialMessage = `Happy Birthday, ${name}!\n\nShubho jonmo dine onek onek shubhechha. Tumi sara jibon amar sathe thako—ei prothom ebong shesh iccha. Onk happy thako, onek bhalobasha diye tomake rakhibo amar hridoye. Tumi amar shob kichu, aar ami tomake bhalobashi beshi beshi.\n\nI love you, forever and always.`;
        
        // Clear previous content
        typedMessage.innerHTML = '';
        
        // Create new Typed instance
        new Typed('#typed-message', {
            strings: [specialMessage],
            typeSpeed: 30,
            showCursor: false,
            onComplete: function() {
                // Show the "Messages" button after typing completes
                viewMessagesBtn.classList.remove('hidden');
                viewMessagesBtn.classList.add('animate__animated', 'animate__pulse', 'animate__infinite');
            }
        });
    }

    // Function to build the message gallery
    function buildMessageGallery() {
        // Show the gallery section
        messageGallery.classList.remove('hidden');
        
        // Clear any existing content
        messageGallery.innerHTML = '<h2 class="neon-text" style="text-align: center; margin-bottom: 40px;">My Messages For You</h2>';
        
        // Create message cards
        messages.forEach((message, index) => {
            const messageCard = document.createElement('div');
            messageCard.className = 'message-card';
            messageCard.innerHTML = `
                <img src="${message.img}" alt="Birthday Message ${index + 1}" class="animate__animated">
                <div class="message-text" id="message-${index}"></div>
            `;
            messageGallery.appendChild(messageCard);
            
            // Add delay based on index
            setTimeout(() => {
                messageCard.classList.add('visible');
                
                // Type the message
                new Typed(`#message-${index}`, {
                    strings: [message.text],
                    typeSpeed: 20,
                    startDelay: 1000 + (index * 500),
                    showCursor: false
                });
                
                // Add confetti for the last message
                if (index === messages.length - 1) {
                    setTimeout(() => {
                        createConfetti();
                        
                        // Add gift button
                        const giftBtn = document.createElement('button');
                        giftBtn.className = 'glow-button';
                        giftBtn.textContent = '🎁 Gift';
                        giftBtn.style.marginTop = '30px';
                        giftBtn.style.fontSize = '1.5rem';
                        giftBtn.addEventListener('click', () => {
                            window.location.href = 'index2.html';
                        });
                        
                        messageCard.appendChild(giftBtn);
                    }, 5000);
                }
            }, 500 * index);
        });
    }

    // Function to create confetti
    function createConfetti() {
        const colors = ['#ff6b6b', '#ffa3a3', '#ff4757', '#fff', '#f8a5c2'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }
});
