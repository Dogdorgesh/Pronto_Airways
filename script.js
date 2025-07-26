document.addEventListener('DOMContentLoaded', function() {
    console.log('🚨 PRONTO AIRWAYS SYSTEM LOADED 🚨');
    console.log('💰 JavaScript loading fee: €4.99');
    
    // Language data
    const translations = {
        en: {
            title: "Pronto Airways - Everyone Flies Priority!",
            tagline: "✈️ Priority for Everyone! ✈️",
            heroTitle: ["EVERYONE", "ABSOLUTELY EVERYONE", "LITERALLY EVERYONE"],
            heroSubtitle: "Experience the revolutionary concept where EVERY passenger gets priority boarding*",
            bookBtn: "BOOK YOUR PRIORITY FLIGHT",
            disclaimer: "*Terms and conditions apply. Priority subject to availability. Fees may vary."
        },
        it: {
            title: "Pronto Airways - Tutti Volano Prioritari!",
            tagline: "✈️ Priorità per Tutti! ✈️",
            heroTitle: ["TUTTI", "ASSOLUTAMENTE TUTTI", "LETTERALMENTE TUTTI"],
            heroSubtitle: "Prova il concetto rivoluzionario dove OGNI passeggero ha l'imbarco prioritario*",
            bookBtn: "PRENOTA IL TUO VOLO PRIORITARIO",
            disclaimer: "*Si applicano termini e condizioni. Priorità soggetta a disponibilità. Le tariffe possono variare."
        }
    };
    
    let currentLang = 'en';
    let delayMinutes = Math.floor(Math.random() * 91) + 5; // Start with random delay 5-95 minutes
    let selectedSeat = null;
    let delayUpdates = 0; // Counter for delay updates
    
    // Initialize delay counter
    initDelayCounter();
    
    // Initialize seat map
    initSeatMap();
    
    // Initialize chatbot
    initChatbot();
    
    // Initialize passenger counter
    initPassengerCounter();
     
    // Initialize mobile menu
    initMobileMenu();
    
    // Event listeners
    document.getElementById('lang-toggle').addEventListener('click', toggleLanguage);
    document.getElementById('dark-toggle').addEventListener('click', toggleDarkMode);
    document.getElementById('hero-seat-btn').addEventListener('click', openSeatModal);
    document.getElementById('hero-baggage-btn').addEventListener('click', openBaggageModal);
    document.getElementById('bag-weight').addEventListener('input', calculateBaggageFees);
    document.getElementById('confirm-seat').addEventListener('click', confirmSeatSelection);
    
    // Modal close handlers
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
    
    function initDelayCounter() {
        const delayReasons = [
            "Calculating priority passenger fees",
            "Waiting for priority queue to clear",
            "Counting oxygen molecules",
            "Processing seat belt rental payments",
            "Verifying everyone's priority status",
            "Collecting breathing fees",
            "Installing premium air filters",
            "Calibrating gravity compensation system",
            "Updating fee calculation software",
            "Conducting mandatory happiness inspections",
            "Reorganizing priority passenger order",
            "Charging extra batteries for premium services",
            "Reviewing additional fee opportunities",
            "Training crew on new surcharge procedures",
            "Optimizing air molecule distribution"
        ];
        
        // Set initial delay and reason
        document.getElementById('delay-minutes').textContent = delayMinutes;
        document.getElementById('delay-reason').textContent = `Reason: ${delayReasons[Math.floor(Math.random() * delayReasons.length)]}`;
        
        setInterval(() => {
            delayMinutes += Math.floor(Math.random() * 3) + 1;
            delayUpdates++;
            document.getElementById('delay-minutes').textContent = delayMinutes;
            
            // Change reason every 10 updates
            if (delayUpdates % 10 === 0) {
                const randomReason = delayReasons[Math.floor(Math.random() * delayReasons.length)];
                document.getElementById('delay-reason').textContent = `Reason: ${randomReason}`;
            }
        }, 5000);
    }
    
    function initSeatMap() {
        const seatMap = document.querySelector('.seat-map');
        const rows = 15;
        const seatsPerRow = 6;
        
        for (let row = 1; row <= rows; row++) {
            for (let seatLetter of ['A', 'B', 'C', 'D', 'E', 'F']) {
                const seat = document.createElement('div');
                const seatCode = `${row}${seatLetter}`;
                seat.className = 'seat';
                seat.textContent = seatCode;
                seat.dataset.seat = seatCode;
                
                // Assign seat types with more variety
                const rand = Math.random();
                
                if (rand > 0.85) {
                    // 15% - Cheap seats (€15-40) - ALL OCCUPIED to show they existed but are taken
                    seat.classList.add('occupied');
                    seat.dataset.price = Math.floor(Math.random() * 25) + 15; // €15-40
                } else if (rand > 0.55) {
                    // 30% - Premium seats (mostly available, some occupied)
                    if (Math.random() > 0.8) {
                        seat.classList.add('occupied');
                    } else {
                        seat.classList.add('premium');
                    }
                    
                    if (row <= 3 || seatLetter === 'A' || seatLetter === 'F') {
                        seat.dataset.price = Math.floor(Math.random() * 1500) + 1500; // €1500-3000
                    } else {
                        seat.dataset.price = Math.floor(Math.random() * 800) + 700; // €700-1500
                    }
                } else if (rand > 0.25) {
                    // 30% - Standard seats (mix of available and occupied)
                    if (Math.random() > 0.6) {
                        seat.classList.add('occupied');
                    } else {
                        seat.classList.add('available');
                    }
                    
                    if (row <= 6) {
                        seat.dataset.price = Math.floor(Math.random() * 200) + 200; // €200-400
                    } else {
                        seat.dataset.price = Math.floor(Math.random() * 150) + 100; // €100-250
                    }
                } else {
                    // 25% - More expensive "available" seats
                    seat.classList.add('available');
                    if (row <= 5) {
                        seat.dataset.price = Math.floor(Math.random() * 600) + 400; // €400-1000
                    } else if (row <= 10) {
                        seat.dataset.price = Math.floor(Math.random() * 400) + 300; // €300-700
                    } else {
                        seat.dataset.price = Math.floor(Math.random() * 300) + 200; // €200-500
                    }
                }
                
                if (!seat.classList.contains('occupied')) {
                    seat.addEventListener('click', selectSeat);
                }
                
                seatMap.appendChild(seat);
            }
        }
    }
    
    function selectSeat(event) {
        // Remove previous selection
        document.querySelectorAll('.seat.selected').forEach(s => s.classList.remove('selected'));
        
        // Select new seat
        event.target.classList.add('selected');
        selectedSeat = event.target.dataset.seat;
        const seatPrice = parseInt(event.target.dataset.price);
        
        document.getElementById('selected-seat').textContent = selectedSeat;
        document.getElementById('seat-fee').textContent = `€${seatPrice}.00`;
        document.getElementById('seat-total').textContent = `€${seatPrice + 40.99}`;
    }
    
    function openSeatModal() {
        document.getElementById('seat-modal').style.display = 'block';
    }
    
    function openBaggageModal() {
        document.getElementById('baggage-modal').style.display = 'block';
        calculateBaggageFees();
    }
    
    function calculateBaggageFees() {
        const weight = parseFloat(document.getElementById('bag-weight').value) || 0;
        const baseFee = 25.00;
        const weightFee = weight * 15.99;
        const handlingFee = 15.99;
        const securityFee = 8.99;
        const tagFee = 3.99;
        const gravityFee = 12.00;
        
        const total = baseFee + weightFee + handlingFee + securityFee + tagFee + gravityFee;
        
        document.getElementById('base-fee').textContent = `€${baseFee.toFixed(2)}`;
        document.getElementById('weight-fee').textContent = `€${weightFee.toFixed(2)}`;
        document.getElementById('handling-fee').textContent = `€${handlingFee.toFixed(2)}`;
        document.getElementById('security-fee').textContent = `€${securityFee.toFixed(2)}`;
        document.getElementById('tag-fee').textContent = `€${tagFee.toFixed(2)}`;
        document.getElementById('gravity-fee').textContent = `€${gravityFee.toFixed(2)}`;
        document.getElementById('baggage-total').textContent = `€${total.toFixed(2)}`;
    }
    
    function toggleLanguage() {
        currentLang = currentLang === 'en' ? 'it' : 'en';
        const langBtn = document.getElementById('lang-toggle');
        langBtn.textContent = currentLang === 'en' ? '🇮🇹 IT' : '🇬🇧 EN';
        
        // Update page content
        document.title = translations[currentLang].title;
        document.querySelector('.tagline').textContent = translations[currentLang].tagline;
        document.querySelector('.hero-subtitle').textContent = translations[currentLang].heroSubtitle;
        document.querySelector('.btn-primary').textContent = translations[currentLang].bookBtn;
        document.querySelector('.disclaimer').textContent = translations[currentLang].disclaimer;
        
        // Update rotating text
        const rotatingSpans = document.querySelectorAll('.rotating-text span');
        rotatingSpans.forEach((span, index) => {
            span.textContent = translations[currentLang].heroTitle[index];
        });
        
        alert(`Language changed to ${currentLang === 'en' ? 'English' : 'Italiano'}! (Language change fee: €12.99)`);
    }
    
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const darkBtn = document.getElementById('dark-toggle');
        const isDark = document.body.classList.contains('dark-mode');
        darkBtn.textContent = isDark ? '☀️' : '🌙';
        
        alert(`${isDark ? 'Dark' : 'Light'} mode activated! (Theme change fee: €7.99)`);
    }
    
    // Add click tracking for "transparent" pricing - exclude the new hero buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            if ((this.textContent.includes('BOOK') || this.textContent.includes('SEARCH')) 
                && !this.id.includes('hero-')) {
                e.preventDefault();
                showFeeModal();
            }
        });
    });

    // Random fee generator for authentic experience
    function generateRandomFee() {
        const fees = [
            "Processing Fee: €19.99",
            "Seat Assignment Fee: €25.00",
            "Breathing Surcharge: €5.00/min",
            "Priority Confirmation Fee: €15.99",
            "Website Usage Fee: €8.50",
            "Gravity Compensation: €12.00",
            "Wi-Fi Fee (for booking only): €29.99",
            "Button Click Fee: €3.99",
            "Screen Viewing Surcharge: €7.50",
            "Priority Processing: €22.99"
        ];
        return fees[Math.floor(Math.random() * fees.length)];
    }

    function showFeeModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.8); display: flex; align-items: center;
            justify-content: center; z-index: 10000; animation: fadeIn 0.3s ease;
        `;
        
        const content = document.createElement('div');
        content.style.cssText = `
            background: white; padding: 2rem; border-radius: 10px;
            max-width: 500px; text-align: center; animation: popup 0.3s ease;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        `;
        
        content.innerHTML = `
            <h3 style="color: #ff6b6b; margin-bottom: 1rem;">🎉 Congratulations! 🎉</h3>
            <p style="margin-bottom: 1rem;">Your booking requires the following additional fee:</p>
            <div style="background: linear-gradient(45deg, #ff6b6b, #ee5a52); color: white; padding: 1rem; margin: 1rem 0; border-radius: 5px; font-weight: bold;">
                ${generateRandomFee()}
            </div>
            <p style="font-size: 0.9rem; color: #666; margin-bottom: 1rem;"><small>This fee was not previously disclosed for your convenience!</small></p>
            <button onclick="this.closest('.modal').remove()" style="margin-top: 1rem; padding: 0.8rem 1.5rem; background: linear-gradient(45deg, #4ecdc4, #44a08d); color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
                Accept & Continue<br><small>(Additional fees may apply)</small>
            </button>
        `;
        
        modal.className = 'modal';
        modal.appendChild(content);
        document.body.appendChild(modal);
        
        // Add animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes popup {
                from { transform: scale(0.5); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    // Simulate "secure" login system
    const loginLink = document.querySelector('a[href="#login"]');
    if (loginLink) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            const username = prompt('Enter your username:');
            if (username) {
                const password = prompt('Enter your password (will be stored securely in plaintext):');
                if (password) {
                    // Simulate storing in "text file"
                    console.log(`SECURITY LOG: Username "${username}" Password "${password}" stored in passwords.txt`);
                    alert('✅ Login successful!\n\n💾 Your credentials have been securely saved to our text file database.\n💰 Login processing fee: €2.99');
                }
            }
        });
    }

    function confirmSeatSelection() {
        if (!selectedSeat) {
            alert('Please select a seat first! (Seat selection reminder fee: €4.99)');
            return;
        }
        
        // Show additional surprise fee popup
        const surpriseFees = [
            "Seat Confirmation Processing: €29.99",
            "Priority Seat Lock-in Fee: €19.99", 
            "Seat Reservation Insurance: €24.99",
            "Comfort Guarantee Surcharge: €34.99",
            "Seat Number Registration: €12.99",
            "Luxury Sitting License: €39.99",
            "Premium Position Tax: €27.99"
        ];
        
        const randomFee = surpriseFees[Math.floor(Math.random() * surpriseFees.length)];
        const feeAmount = parseFloat(randomFee.match(/€(\d+\.\d+)/)[1]);
        const currentTotal = parseFloat(document.getElementById('seat-total').textContent.replace('€', ''));
        const newTotal = currentTotal + feeAmount;
        
        const surpriseModal = document.createElement('div');
        surpriseModal.style.cssText = `
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.9); display: flex; align-items: center;
            justify-content: center; z-index: 10001; animation: fadeIn 0.3s ease;
        `;
        
        const surpriseContent = document.createElement('div');
        surpriseContent.style.cssText = `
            background: white; padding: 2rem; border-radius: 15px;
            max-width: 500px; text-align: center; animation: popup 0.3s ease;
            box-shadow: 0 20px 50px rgba(255,0,0,0.3); border: 3px solid #ff6b6b;
        `;
        
        surpriseContent.innerHTML = `
            <h3 style="color: #ff6b6b; margin-bottom: 1rem;">🚨 MANDATORY ADDITIONAL FEE 🚨</h3>
            <p style="margin-bottom: 1rem;">Your seat selection requires an additional mandatory fee:</p>
            <div style="background: linear-gradient(45deg, #ff6b6b, #ee5a52); color: white; padding: 1.5rem; margin: 1rem 0; border-radius: 10px; font-weight: bold; font-size: 1.2rem;">
                ${randomFee}
            </div>
            <p style="margin-bottom: 1rem;">Previous total: €${currentTotal.toFixed(2)}</p>
            <p style="margin-bottom: 1.5rem; font-weight: bold; font-size: 1.2rem; color: #ff6b6b;">New total: €${newTotal.toFixed(2)}</p>
            <p style="font-size: 0.9rem; color: #666; margin-bottom: 1.5rem;"><em>This fee was not disclosed earlier for your convenience!</em></p>
            <button id="accept-surprise-fee" style="padding: 1rem 2rem; background: linear-gradient(45deg, #4ecdc4, #44a08d); color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: bold; font-size: 1.1rem;">
                Accept Additional Fee & Confirm Seat
            </button>
        `;
        
        surpriseModal.appendChild(surpriseContent);
        document.body.appendChild(surpriseModal);
        
        // Handle accepting the surprise fee
        document.getElementById('accept-surprise-fee').addEventListener('click', function() {
            surpriseModal.remove();
            document.getElementById('seat-modal').style.display = 'none';
            
            // Show success message
            alert(`🎉 Seat ${selectedSeat} confirmed!\n\nFinal total: €${newTotal.toFixed(2)}\n\n✈️ Thank you for choosing Pronto Airways!\n\n*Seat confirmation email fee: €8.99`);
            
            // Reset selection
            selectedSeat = null;
            document.querySelectorAll('.seat.selected').forEach(s => s.classList.remove('selected'));
            document.getElementById('selected-seat').textContent = 'None';
            document.getElementById('seat-fee').textContent = '€0.00';
            document.getElementById('seat-total').textContent = '€40.99';
        });
    }

    function initChatbot() {
        const chatbotToggle = document.getElementById('chatbot-toggle');
        const chatbotWidget = document.getElementById('chatbot-widget');
        const chatbotInput = document.getElementById('chatbot-input');
        const chatbotSend = document.getElementById('chatbot-send');
        const chatbotMessages = document.getElementById('chatbot-messages');
        
        let isMinimized = false;
        let isMobileCircle = false;
        
        // Check if mobile and set circle mode
        function checkMobileMode() {
            if (window.innerWidth <= 768) {
                if (!isMobileCircle) {
                    chatbotWidget.classList.add('mobile-circle');
                    isMobileCircle = true;
                    isMinimized = true;
                }
            } else {
                if (isMobileCircle) {
                    chatbotWidget.classList.remove('mobile-circle');
                    isMobileCircle = false;
                    isMinimized = false;
                    chatbotWidget.classList.remove('minimized');
                }
            }
        }
        
        // Initial check
        checkMobileMode();
        
        // Check on resize
        window.addEventListener('resize', checkMobileMode);
        
        // Toggle chatbot
        chatbotToggle.addEventListener('click', function() {
            if (isMobileCircle) {
                // On mobile, expand to full chat
                chatbotWidget.classList.remove('mobile-circle');
                chatbotWidget.classList.remove('minimized');
                isMobileCircle = false;
                isMinimized = false;
            } else {
                // Normal toggle behavior
                isMinimized = !isMinimized;
                chatbotWidget.classList.toggle('minimized', isMinimized);
                
                // On mobile, if minimizing, go back to circle
                if (isMinimized && window.innerWidth <= 768) {
                    chatbotWidget.classList.add('mobile-circle');
                    isMobileCircle = true;
                }
            }
        });
        
        // Send message
        function sendMessage() {
            const message = chatbotInput.value.trim();
            if (!message) return;
            
            // Add user message
            addMessage(message, 'user');
            chatbotInput.value = '';
            
            // Calculate character fee
            const charFee = (message.length * 0.99).toFixed(2);
            
            // Add bot response after delay
            setTimeout(() => {
                const response = getBotResponse(message);
                addMessage(response + ` (Character fee: €${charFee})`, 'bot');
            }, 1000);
        }
        
        chatbotSend.addEventListener('click', sendMessage);
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        function addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `${sender}-message`;
            
            const bubbleDiv = document.createElement('div');
            bubbleDiv.className = 'message-bubble';
            bubbleDiv.textContent = text;
            
            messageDiv.appendChild(bubbleDiv);
            chatbotMessages.appendChild(messageDiv);
            
            // Scroll to bottom
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
        
        function getBotResponse(userMessage) {
            const responses = [
                "I understand your concern, but have you considered our Premium Concern Package for only €29.99?",
                "That's a great question! The answer will cost €15.99 to access.",
                "I'd love to help! First, please pay the Support Access Fee of €19.99.",
                "Your issue is very common. We offer a Common Issue Resolution Service for €39.99.",
                "I see you're frustrated. Our Frustration Management Program is available for €24.99!",
                "For technical support, please upgrade to our Premium Support Package (€49.99).",
                "I'm sorry, but free support ended in 2019. Current support starts at €12.99.",
                "Have you tried turning it off and paying our Technical Assistance Fee of €22.99?",
                "Your message has been forwarded to our Fee Department. Processing fee: €8.99.",
                "Great news! We can solve this with our Problem Solution Subscription (€99.99/month)!"
            ];
            
            // Special responses for specific keywords
            if (userMessage.toLowerCase().includes('free')) {
                return "Did you say 'free'? That word isn't in our vocabulary! Everything has a fee here. 💰";
            }
            if (userMessage.toLowerCase().includes('refund')) {
                return "Refunds are available through our Refund Request Service for €199.99 (non-refundable).";
            }
            if (userMessage.toLowerCase().includes('help')) {
                return "I'm here to help... for a small fee! Our Basic Help Package starts at €14.99.";
            }
            if (userMessage.toLowerCase().includes('complaint')) {
                return "Filing a complaint? That'll be €49.99. Want to complain about the complaint fee? That's another €25.99!";
            }
            
            return responses[Math.floor(Math.random() * responses.length)];
        }
    }
    
    function initPassengerCounter() {
        const passengerCountElement = document.getElementById('passenger-count');
        let currentCount = Math.floor(Math.random() * 50000) + 25000; // Start between 25k-75k
        
        // Display initial count
        updatePassengerCount(currentCount);
        
        // Update counter every 3-8 seconds
        setInterval(() => {
            // Random change between -500 to +1000 (usually increasing due to "high demand")
            const change = Math.floor(Math.random() * 1500) - 500;
            currentCount = Math.max(currentCount + change, 10000); // Never go below 10k
            
            // Occasionally add big spikes for "viral moments"
            if (Math.random() > 0.95) {
                currentCount += Math.floor(Math.random() * 5000) + 2000;
            }
            
            updatePassengerCount(currentCount);
        }, Math.random() * 5000 + 3000); // 3-8 seconds
        
        function updatePassengerCount(count) {
            // Animate the number change
            passengerCountElement.style.animation = 'none';
            setTimeout(() => {
                passengerCountElement.textContent = count.toLocaleString();
                passengerCountElement.style.animation = 'numberChange 1s ease-in-out';
            }, 10);
            
            // Update warning based on count
            const warningElement = document.querySelector('.counter-warning');
            if (count > 60000) {
                warningElement.textContent = '🚨 EXTREME demand! Prices rising fast!';
                warningElement.style.background = 'rgba(255,0,0,0.3)';
            } else if (count > 45000) {
                warningElement.textContent = '⚠️ Very high demand! Book now!';
                warningElement.style.background = 'rgba(255,165,0,0.3)';
            } else {
                warningElement.textContent = '⚠️ High demand! Prices may increase';
                warningElement.style.background = 'rgba(255,255,255,0.2)';
            }
        }
    }
    
    function initMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('nav-links');
        
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger
            hamburger.classList.toggle('active');
            
            // Charge fee for menu interaction
            if (Math.random() > 0.8) {
                setTimeout(() => {
                    alert('Menu interaction fee: €1.99 has been applied to your account!');
                }, 1000);
            }
        });
        
        // Close menu when clicking on links
        document.querySelectorAll('.nav-links a, .nav-links button').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
    
    // ...existing code for other features...
});
