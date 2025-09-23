// src/components/ContactForm.tsx
import { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Send, CheckCircle } from 'lucide-react';

interface ThemeClasses {
  bg: string;
  bgSecondary: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  card: string;
  cardHover: string;
  input: string;
  accent: string;
  gradient: string;
}

interface ContactFormProps {
  theme: ThemeClasses;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ theme }) => {
  const [state, handleSubmit] = useForm("xovnbqld");
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(e);
    
    // Limpiar formulario después del envío exitoso
    if (state.succeeded) {
      setFormData({ name: '', email: '', message: '' });
    }
  };

  // Pantalla de éxito
  if (state.succeeded) {
    return (
      <div className={`${theme.card} rounded-lg p-8 transition-all duration-300`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-green-500">¡Mensaje Enviado!</h3>
          <p className={`${theme.textSecondary} mb-6`}>
            Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos en menos de 24 horas.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            Enviar otro mensaje
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${theme.card} rounded-lg p-8 transition-all duration-300`}>
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Campos ocultos para configuración */}
        <input type="hidden" name="_subject" value="Nuevo mensaje de contacto - Mutantech" />
        <input type="hidden" name="_replyto" value={formData.email} />
        
        <div>
          <label className="block text-sm font-medium mb-2">Nombre *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            maxLength={100}
            className={`w-full px-4 py-3 ${theme.input} rounded-lg focus:border-green-500 focus:outline-none transition-colors ${theme.text}`}
            placeholder="Tu nombre completo"
            disabled={state.submitting}
          />
          <ValidationError 
            prefix="Name" 
            field="name"
            errors={state.errors}
            className="text-red-400 text-sm mt-1"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            maxLength={255}
            className={`w-full px-4 py-3 ${theme.input} rounded-lg focus:border-green-500 focus:outline-none transition-colors ${theme.text}`}
            placeholder="tu@email.com"
            disabled={state.submitting}
          />
          <ValidationError 
            prefix="Email" 
            field="email"
            errors={state.errors}
            className="text-red-400 text-sm mt-1"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Mensaje *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            maxLength={2000}
            rows={5}
            className={`w-full px-4 py-3 ${theme.input} rounded-lg focus:border-green-500 focus:outline-none transition-colors resize-none ${theme.text}`}
            placeholder="Cuéntanos sobre tu proyecto..."
            disabled={state.submitting}
          />
          <ValidationError 
            prefix="Message" 
            field="message"
            errors={state.errors}
            className="text-red-400 text-sm mt-1"
          />
          <div className="text-sm text-gray-500 mt-1">
            {formData.message.length}/2000 caracteres
          </div>
        </div>

        <button
          type="submit"
          disabled={state.submitting || !formData.name.trim() || !formData.email.trim() || !formData.message.trim()}
          className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:opacity-50 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
        >
          {state.submitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Enviando...
            </>
          ) : (
            <>
              Enviar Mensaje <Send className="w-5 h-5" />
            </>
          )}
        </button>
        
        <div className="text-xs text-gray-500 text-center">
          Los mensajes son enviados de forma segura a través de Formspree.
        </div>
      </form>
    </div>
  );
};

export default ContactForm;