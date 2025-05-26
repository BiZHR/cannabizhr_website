// Open-Source Calendar Component for CannaBiz HR
// Professional consultation scheduling system

class CannaBizCalendar {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentDate = new Date();
        this.selectedDate = null;
        this.selectedTime = null;
        this.availableSlots = {};
        
        if (this.container) {
            this.init();
        }
    }
    
    init() {
        this.render();
        this.bindEvents();
    }
    
    render() {
        const calendarHTML = `
            <div class="calendar-container">
                <div class="calendar-header">
                    <button class="calendar-nav" id="prev-month">&larr;</button>
                    <h3 class="calendar-title" id="calendar-title"></h3>
                    <button class="calendar-nav" id="next-month">&rarr;</button>
                </div>
                <div class="calendar-weekdays">
                    <div class="weekday">Sun</div>
                    <div class="weekday">Mon</div>
                    <div class="weekday">Tue</div>
                    <div class="weekday">Wed</div>
                    <div class="weekday">Thu</div>
                    <div class="weekday">Fri</div>
                    <div class="weekday">Sat</div>
                </div>
                <div class="calendar-days" id="calendar-days"></div>
                <div class="time-slots-container" id="time-slots" style="display: none;">
                    <h4>Available Time Slots</h4>
                    <div class="time-slots-grid" id="time-slots-grid"></div>
                    <div class="selected-appointment" id="selected-appointment" style="display: none;">
                        <h4>Selected Appointment</h4>
                        <p><strong>Date:</strong> <span id="selected-date"></span></p>
                        <p><strong>Time:</strong> <span id="selected-time"></span></p>
                        <button class="btn btn-primary" id="confirm-booking">Confirm Consultation</button>
                    </div>
                </div>
            </div>
        `;
        
        this.container.innerHTML = calendarHTML;
        this.updateCalendar();
    }
    
    bindEvents() {
        // Navigation buttons
        document.getElementById('prev-month').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.updateCalendar();
        });
        
        document.getElementById('next-month').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.updateCalendar();
        });
        
        // Confirm booking button
        document.getElementById('confirm-booking').addEventListener('click', () => {
            this.confirmBooking();
        });
    }
    
    updateCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        // Update title
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        document.getElementById('calendar-title').textContent = `${monthNames[month]} ${year}`;
        
        // Generate calendar days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();
        
        let daysHTML = '';
        
        // Empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            daysHTML += '<div class="calendar-day empty"></div>';
        }
        
        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isPast = date < today.setHours(0, 0, 0, 0);
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            const isSelected = this.selectedDate && 
                date.toDateString() === this.selectedDate.toDateString();
            
            let classes = 'calendar-day';
            if (isPast) classes += ' past';
            if (isWeekend) classes += ' weekend';
            if (isSelected) classes += ' selected';
            
            daysHTML += `
                <div class="${classes}" data-date="${date.toISOString()}">
                    ${day}
                </div>
            `;
        }
        
        document.getElementById('calendar-days').innerHTML = daysHTML;
        
        // Bind day click events
        document.querySelectorAll('.calendar-day:not(.empty):not(.past)').forEach(day => {
            day.addEventListener('click', (e) => {
                this.selectDate(new Date(e.target.dataset.date));
            });
        });
    }
    
    async selectDate(date) {
        // Remove previous selection
        document.querySelectorAll('.calendar-day.selected').forEach(day => {
            day.classList.remove('selected');
        });
        
        // Add selection to clicked day
        document.querySelector(`[data-date="${date.toISOString()}"]`).classList.add('selected');
        
        this.selectedDate = date;
        this.selectedTime = null;
        
        // Show time slots
        await this.loadTimeSlots(date);
        document.getElementById('time-slots').style.display = 'block';
        document.getElementById('selected-appointment').style.display = 'none';
    }
    
    async loadTimeSlots(date) {
        const dateString = date.toISOString().split('T')[0];
        
        try {
            // In a real implementation, this would fetch from your API
            const response = await fetch(`/api/availability?date=${dateString}`);
            const data = await response.json();
            
            if (data.success) {
                this.displayTimeSlots(data.slots);
            } else {
                this.displayDefaultSlots();
            }
        } catch (error) {
            console.error('Failed to load time slots:', error);
            this.displayDefaultSlots();
        }
    }
    
    displayDefaultSlots() {
        // Generate default business hour slots (9 AM - 5 PM)
        const slots = [];
        for (let hour = 9; hour < 17; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                slots.push({ time, available: true });
            }
        }
        this.displayTimeSlots(slots);
    }
    
    displayTimeSlots(slots) {
        const grid = document.getElementById('time-slots-grid');
        let slotsHTML = '';
        
        slots.forEach(slot => {
            if (slot.available) {
                slotsHTML += `
                    <button class="time-slot" data-time="${slot.time}">
                        ${this.formatTime(slot.time)}
                    </button>
                `;
            }
        });
        
        grid.innerHTML = slotsHTML;
        
        // Bind time slot events
        document.querySelectorAll('.time-slot').forEach(slot => {
            slot.addEventListener('click', (e) => {
                this.selectTime(e.target.dataset.time);
            });
        });
    }
    
    selectTime(time) {
        // Remove previous selection
        document.querySelectorAll('.time-slot.selected').forEach(slot => {
            slot.classList.remove('selected');
        });
        
        // Add selection
        document.querySelector(`[data-time="${time}"]`).classList.add('selected');
        
        this.selectedTime = time;
        
        // Show appointment summary
        document.getElementById('selected-date').textContent = 
            this.selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        document.getElementById('selected-time').textContent = this.formatTime(time);
        document.getElementById('selected-appointment').style.display = 'block';
    }
    
    formatTime(time) {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
        return `${displayHour}:${minutes} ${ampm}`;
    }
    
    confirmBooking() {
        if (!this.selectedDate || !this.selectedTime) {
            alert('Please select both a date and time for your consultation.');
            return;
        }
        
        // Emit custom event with booking details
        const bookingEvent = new CustomEvent('consultationBooked', {
            detail: {
                date: this.selectedDate,
                time: this.selectedTime,
                datetime: new Date(`${this.selectedDate.toDateString()} ${this.selectedTime}`)
            }
        });
        
        document.dispatchEvent(bookingEvent);
        
        // Show success message
        this.showBookingSuccess();
    }
    
    showBookingSuccess() {
        const successHTML = `
            <div class="booking-success">
                <div class="success-icon">✓</div>
                <h3>Consultation Scheduled!</h3>
                <p>Your free consultation has been scheduled for:</p>
                <p><strong>${this.selectedDate.toLocaleDateString()} at ${this.formatTime(this.selectedTime)}</strong></p>
                <p>You will receive a confirmation email shortly with meeting details.</p>
                <button class="btn btn-primary" onclick="location.reload()">Schedule Another</button>
            </div>
        `;
        
        this.container.innerHTML = successHTML;
    }
    
    getSelectedAppointment() {
        return {
            date: this.selectedDate,
            time: this.selectedTime,
            datetime: this.selectedDate && this.selectedTime ? 
                new Date(`${this.selectedDate.toDateString()} ${this.selectedTime}`) : null
        };
    }
}

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Calendar will be initialized when contact form includes calendar modal
    window.CannaBizCalendar = CannaBizCalendar;
});