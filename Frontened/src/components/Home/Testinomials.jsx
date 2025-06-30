import React from 'react';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Arjun Singh',
      course: 'B.Tech Computer Science',
      text: 'The expense tracking feature helped me save ₹800 last month! Now I know exactly where my food budget goes.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      course: 'M.A. English Literature',
      text: 'Love how I can order from any canteen and track everything in one place. The budget insights are amazing!',
      rating: 5
    },
    {
      name: 'Rajesh Kumar',
      course: 'MBA',
      text: 'Finally, a system that manages both mess meals and canteen expenses. The analytics help me budget better.',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-600">
            Real feedback from Punjab University students about their food and expense management experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
              <div>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.course}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;