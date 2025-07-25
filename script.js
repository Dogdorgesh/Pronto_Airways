document.addEventListener('DOMContentLoaded', function() {
    console.log('🚨 PRONTO AIRWAYS SYSTEM LOADED 🚨');
    console.log('💰 JavaScript loading fee: $4.99');
    
    // Add click tracking for "transparent" pricing
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.textContent.includes('BOOK') || this.textContent.includes('SEARCH')) {
                e.preventDefault();
                showFeeModal();
            }
        });
    });

    // Random fee generator for authentic experience
    function generateRandomFee() {
        const fees = [
            "Processing Fee: $19.99",
            "Seat Assignment Fee: $25.00",
            "Breathing Surcharge: $5.00/min",
            "Priority Confirmation Fee: $15.99",
            "Website Usage Fee: $8.50",
            "Gravity Compensation: $12.00",
            "Wi-Fi Fee (for booking only): $29.99",
            "Button Click Fee: $3.99",
            "Screen Viewing Surcharge: $7.50",
            "Priority Processing: $22.99"
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
                    alert('✅ Login successful!\n\n💾 Your credentials have been securely saved to our text file database.\n💰 Login processing fee: $2.99');
                }
            }
        });
    }

    // ...existing code for other features...
});
