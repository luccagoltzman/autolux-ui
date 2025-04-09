'use client';

import { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Importe os estilos CSS do Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Testimonial = {
  name: string;
  text: string;
  rating: number;
  image?: string;
  vehicle?: string;
  service?: string;
};

const testimonials: Testimonial[] = [
  {
    name: 'Carlos Silva',
    text: 'Serviço impecável! Meu carro ficou como novo. Recomendo a todos que buscam qualidade.',
    rating: 5,
    vehicle: 'Honda Civic',
    service: 'Polimento Completo'
  },
  {
    name: 'Ana Oliveira',
    text: 'Atendimento excelente e resultado surpreendente. O polimento removeu todos os riscos da pintura.',
    rating: 5,
    vehicle: 'Toyota Corolla',
    service: 'Vitrificação'
  },
  {
    name: 'Marcos Pereira',
    text: 'Fiz a vitrificação há 6 meses e a pintura continua protegida e brilhando. Vale cada centavo!',
    rating: 5,
    vehicle: 'Jeep Compass',
    service: 'Ceramização'
  },
  {
    name: 'Juliana Costa',
    text: 'Levei meu carro para higienização interna e o resultado foi incrível. Parecia novo por dentro!',
    rating: 5,
    vehicle: 'Hyundai HB20',
    service: 'Higienização Interna'
  },
  {
    name: 'Roberto Almeida',
    text: 'Profissionais sérios e atenciosos. O carro foi entregue no prazo e com um acabamento perfeito.',
    rating: 5,
    vehicle: 'Volkswagen Golf',
    service: 'Pacote Completo'
  }
];

export default function TestimonialSlider() {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
      }
    }
  };
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span 
        key={index} 
        className={`text-xl ${index < rating ? 'text-red-600' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className="w-full py-8"
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="py-10"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-600 h-full flex flex-col">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 flex-grow">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center mt-auto">
                {testimonial.image ? (
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    <span className="text-gray-500 font-bold text-xl">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                )}
                
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  {testimonial.vehicle && (
                    <p className="text-sm text-gray-500">{testimonial.vehicle}</p>
                  )}
                  {testimonial.service && (
                    <p className="text-xs text-red-600">{testimonial.service}</p>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
} 