import ContactComponent from '../components/Contact';
import { motion } from 'framer-motion';

export default function Contact() {
    return (
        <main className="pt-20 md:pt-24 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4 py-8"
            >
                <div id="contact">
                    <ContactComponent />
                </div>
            </motion.div>
        </main>
    );
}
