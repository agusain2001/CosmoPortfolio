import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaUserAstronaut, FaHome } from "react-icons/fa";
import { BiPlanet } from "react-icons/bi";

export default function Error() {
    return (
        <main className="min-h-screen w-full relative overflow-hidden flex items-center justify-center bg-transparent">
            {/* Background Ambience & Icons */}
            <div className="absolute inset-0 overflow-hidden select-none pointer-events-none">
                {/* Glow Effects */}
                <div className="absolute top-[10%] left-[10%] w-72 h-72 bg-nebula-purple/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] right-[10%] w-64 h-64 bg-cosmic-blue/20 rounded-full blur-[100px]" />

                {/* Floating Astronaut (Background Element) */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{
                        opacity: 0.15,
                        y: [0, -30, 0],
                        rotate: [0, 10, 0],
                        x: 0
                    }}
                    transition={{
                        y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                        opacity: { duration: 1 }
                    }}
                    className="absolute top-1/4 right-[10%] md:right-[20%] text-8xl md:text-[16rem] text-white z-0"
                >
                    <FaUserAstronaut />
                </motion.div>

                {/* Small satellite planet */}
                <motion.div
                    initial={{ opacity: 0.4}}
                    animate={{
                        x: [0, 30, 0],
                        y: [0, -30, 0]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/3 left-[15%] text-4xl md:text-8xl text-gray-50"
                >
                    <BiPlanet />
                </motion.div>
            </div>

            <div className="container mx-auto px-4 z-10 text-center">
                {/* 404 Text */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-8xl md:text-[10rem] leading-none font-bold bg-clip-text text-transparent bg-gradient-to-r from-nebula-purple via-cosmic-blue to-solar-orange font-mono">
                        Error 404
                    </h1>
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 mt-4">
                        Houston, We Have a Problem
                    </h2>
                    <p className="text-text-secondary text-lg max-w-lg mx-auto mb-10">
                        The page you're looking for seems to have drifted into a black hole.
                        Let's get you back to solid ground.
                    </p>
                </motion.div>

                {/* Action Button */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-nebula-purple/20 border border-nebula-purple/50 rounded-full text-white font-medium hover:bg-nebula-purple/40 backdrop-blur-sm transition-all duration-300 btn-hover-lift group"
                    >
                        <FaHome className="text-xl group-hover:scale-110 transition-transform" />
                        <span className="text-lg">Return to Mission Control</span>
                    </Link>
                </motion.div>
            </div>
        </main>
    );
}
