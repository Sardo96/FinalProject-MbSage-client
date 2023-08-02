import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import Modal from 'react-modal';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fetchBookedDates();
  }, []);

  const fetchBookedDates = async () => {
    try {
      const response = await axios.get('/api/bookings');
      const eventsData = response.data.map(booking => ({
        id: booking._id,
        title: 'Booked',
        start: new Date(booking.appointmentDate),
        end: new Date(booking.endTime)
      }));
      setEvents(eventsData);
    } catch (error) {
      console.log('An error occurred fetching booked dates', error);
    }
  };

  const isWithinBookingHours = date => {
    // Assume booking hours are from 9 AM to 5 PM
    const startHour = 9;
    const endHour = 17;
    const hour = date.getHours();
    return hour >= startHour && hour <= endHour;
  };

  const handleSelectSlot = slotInfo => {
    if (isWithinBookingHours(slotInfo.start)) {
      setSelectedSlot(slotInfo);
      setShowModal(true);
    }
  };

  const handleBookingFormSubmit = async e => {
    e.preventDefault();

    try {
      if (!selectedSlot || !name || !phone) {
        // Handle form validation error (e.g., show error message)
        return;
      }

      // Create a new booking with the selected date and time
      const response = await axios.post('/api/bookings', {
        appointmentDate: selectedSlot.start,
        endTime: selectedSlot.end,
        name,
        phone
        // Add other booking data as needed (e.g., massageId, etc.)
      });

      // Handle the response as needed (e.g., show a success message)
      console.log('Booking successful!', response.data);

      // Clear the booking form and close the modal
      setSelectedSlot(null);
      setName('');
      setPhone('');
      setShowModal(false);
    } catch (error) {
      console.log('An error occurred while booking', error);
    }
  };

  return (
    <div className='my-calendar w-full max-w-md mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>My Calendar</h2>
      <div className='relative'>
        <Calendar
          localizer={localizer}
          events={events}
          selectable
          onSelectSlot={handleSelectSlot}
          style={{ height: 500 }}
        />
        <Modal
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
          className='modal-content'
          overlayClassName='modal-overlay'
        >
          <div className='booking-form mt-4'>
            <h3 className='text-lg font-bold mb-2'>Book a Massage</h3>
            <form onSubmit={handleBookingFormSubmit}>
              <div className='mb-2'>
                <label htmlFor='name' className='block font-medium'>
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  className='w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
              <div className='mb-2'>
                <label htmlFor='phone' className='block font-medium'>
                  Phone
                </label>
                <input
                  type='text'
                  id='phone'
                  className='w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className='flex justify-end'>
                <button
                  type='submit'
                  className='mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md'
                >
                  Book Now
                </button>
                <button
                  type='button'
                  className='mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md ml-2'
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default MyCalendar;
