"use client";

import * as React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./OrganisingTeamSection.css";
import { Carousel } from "@/components/ui/carousel";
import AnimatedTeamCard from "./AnimatedTeamCard";

const team = {
    professorCoordinator: {
        role: "Faculty Coordinator",
        name: "Dr. Bipin Kumar Rai",
        designation: "Professor, CSE",
        instagram: "https://instagram.com/your_instagram_handle",
        linkedin: "https://linkedin.com/in/your_linkedin_handle",
        imageSrc: "/images/prof.png"
    },
    studentCoordinators: [
        {
            emoji: "🧑‍🎓",
            role: "Student Coordinator",
            name: "Utkarsh Priye (Jha)",
            contact: "99396 35206",
            instagram: "https://instagram.com/your_instagram_handle",
            linkedin: "https://linkedin.com/in/your_linkedin_handle",
            imageSrc: "/images/coords.png"
        },
        {
            emoji: "🧑‍🎓",
            role: "Student Coordinator",
            name: "Ritvik Vasundh",
            contact: "82996 86568",
            instagram: "https://instagram.com/your_instagram_handle",
            linkedin: "https://linkedin.com/in/your_linkedin_handle",
            imageSrc: "/images/coords.png"
        },
        {
            emoji: "🧑‍🎓",
            role: "Student Coordinator & Design Head",
            name: "Jiya Patel",
            contact: "73832 32239",
            instagram: "https://instagram.com/your_instagram_handle",
            linkedin: "https://linkedin.com/in/your_linkedin_handle",
            imageSrc: "/images/coords.png"
        },
    ],
    webTeamHeads: [
        {
            emoji: "💻",
            role: "Web Team Head",
            name: "Rahul Jadvani",
            contact: "63620 50449",
            instagram: "https://instagram.com/your_instagram_handle",
            linkedin: "https://linkedin.com/in/your_linkedin_handle",
            imageSrc: "/images/wenhead.png"
        },
    ],
    designTeamHead: {
        emoji: "🎨",
        role: "Marketing & Cultural Head",
        name: "Ashwin",
        contact: "97407 41554",
        instagram: "https://instagram.com/your_instagram_handle",
        linkedin: "https://linkedin.com/in/your_linkedin_handle",
        imageSrc: "/images/deshead.png"
    },
    allMembers: [
        { emoji: "🧑‍🎓", label: "Manavi P", role: "Web Dev", phoneNumber: "98765 43210", instagram: "https://instagram.com/your_instagram_handle", linkedin: "https://linkedin.com/in/your_linkedin_handle" },
        { emoji: "🧑‍🎓", label: "S Shreenidhi", role: "Web Dev", phoneNumber: "98765 43211", instagram: "https://instagram.com/your_instagram_handle", linkedin: "https://linkedin.com/in/your_linkedin_handle" },
        { emoji: "🧑‍🎓", label: "G Nithesh", role: "Web Dev", phoneNumber: "98765 43212", instagram: "https://instagram.com/your_instagram_handle", linkedin: "https://linkedin.com/in/your_linkedin_handle" },
        { emoji: "🧑‍🎓", label: "Sachin Baluragi", role: "Web Dev", phoneNumber: "98765 43213", instagram: "https://instagram.com/your_instagram_handle", linkedin: "https://linkedin.com/in/your_linkedin_handle" },
        { emoji: "🎨", label: "Mayur", role: "Design Team", phoneNumber: "98765 43214", instagram: "https://instagram.com/your_instagram_handle", linkedin: "https://linkedin.com/in/your_linkedin_handle" },
        { emoji: "🎨", label: "Niharika", role: "Design Team", phoneNumber: "98765 43215", instagram: "https://instagram.com/your_instagram_handle", linkedin: "https://linkedin.com/in/your_linkedin_handle" },
        { emoji: "🎨", label: "Moulya", role: "Design Team", phoneNumber: "98765 43216", instagram: "https://instagram.com/your_instagram_handle", linkedin: "https://linkedin.com/in/your_linkedin_handle" },
        { emoji: "🎨", label: "Moulika", role: "Design Team", phoneNumber: "98765 43217", instagram: "https://instagram.com/your_instagram_handle", linkedin: "https://linkedin.com/in/your_linkedin_handle" },
        { emoji: "🎨", label: "Raksha", role: "Design Team", phoneNumber: "98765 43218", instagram: "https://instagram.com/your_instagram_handle", linkedin: "https://linkedin.com/in/your_linkedin_handle" },
        { emoji: "🎨", label: "Trisha", role: "Design Team", phoneNumber: "98765 43219", instagram: "https://instagram.com/your_instagram_handle", linkedin: "https://linkedin.com/in/your_linkedin_handle" },
        { emoji: "🎨", label: "Aastha", role: "Design Team", phoneNumber: "98765 43220", instagram: "https://instagram.com/your_instagram_handle", linkedin: "https://linkedin.com/in/your_linkedin_handle" },
        { emoji: "🤝", label: "Harsh", role: "Sponsorship Team", phoneNumber: "98765 43221", instagram: "https://instagram.com/your_instagram_handle", linkedin: "https://linkedin.com/in/your_linkedin_handle" },
        { emoji: "📢", label: "Ahmad", role: "Marketing Team", phoneNumber: "98765 43222", instagram: "https://instagram.com/your_instagram_handle", linkedin: "https://linkedin.com/in/your_linkedin_handle" },
        { emoji: "📢", label: "Vivan", role: "Marketing Team", phoneNumber: "98765 43223", instagram: "https://instagram.com/your_instagram_handle", linkedin: "https://linkedin.com/in/your_linkedin_handle" },
        // ...add more as needed
    ],
};

// Social Media Icons Component
const SocialMediaIcons = ({ instagram, linkedin }: { instagram: string; linkedin: string }) => (
    <div className="flex justify-center space-x-3 mt-3">
        <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-600 transition-colors duration-200"
        >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
        </a>
        <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
        >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        </a>
    </div>
);

// Helper function to format role text with line breaks
const formatRole = (role: string) => {
    return role.split('&').map((part, index) => (
        <div key={index} className="leading-tight">
            {part.trim()}
        </div>
    ));
};

export const OrganisingTeamSection = () => {
    // Animation on in-view
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.15 });

    React.useEffect(() => {
        if (inView) {
            controls.start({ opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } });
        } else {
            controls.start({ opacity: 0, y: 60 });
        }
    }, [inView, controls]);

    return (
        <motion.section
            id="organising-team"
            className="organising-team-section"
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={controls}
        >
            <div className="container mx-auto px-2 sm:px-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 organising-team-title" style={{ marginTop: '2.5rem' }}>
                    Organising Team
                </h2>

                {/* Animated Cards Grid for 6 Main Members */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {/* Faculty Coordinator */}
                    <motion.div
                        initial={{ opacity: 0, y: 60, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <AnimatedTeamCard member={team.professorCoordinator} delay={0.1} cardIndex={0} />
                    </motion.div>

                    {/* Student Coordinators */}
                    {team.studentCoordinators.map((member, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 60, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.6, delay: 0.2 + (idx * 0.1) }}
                        >
                            <AnimatedTeamCard member={member} delay={0.2 + (idx * 0.1)} cardIndex={1 + idx} />
                        </motion.div>
                    ))}

                    {/* Web Team Head */}
                    {team.webTeamHeads.map((member, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 60, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <AnimatedTeamCard member={member} delay={0.5} cardIndex={4} />
                        </motion.div>
                    ))}

                    {/* Design Team Head */}
                    <motion.div
                        initial={{ opacity: 0, y: 60, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <AnimatedTeamCard member={team.designTeamHead} delay={0.6} cardIndex={5} />
                    </motion.div>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 organising-team-title" style={{ marginTop: '2.5rem' }}>Meet the Entire Team</h2>
                <div className="flex justify-center" style={{ marginBottom: '4rem' }}>
                    <div className="relative overflow-hidden w-full h-full py-20">
                        <Carousel
                            slides={team.allMembers.map((member, index) => ({
                                title: member.label,
                                subtitle: member.role,
                                button: "Explore Component",
                                src: "/images/memb.png",
                                instagram: member.instagram,
                                linkedin: member.linkedin,
                                phoneNumber: member.phoneNumber || "Contact via social media"
                            }))}
                            autoplayInterval={3000}
                        />
                    </div>
                </div>
            </div>
        </motion.section>
    );
}; 