"use client";

import * as React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./OrganisingTeamSection.css";
import { Carousel } from "@/components/ui/carousel";

const team = {
    professorCoordinator: {
        emoji: "👨‍🏫",
        role: "Faculty Coordinator",
        name: "Dr. Bipin Kumar Rai",
        designation: "Professor, CSE"
    },
    studentCoordinators: [
        {
            emoji: "🧑‍🎓",
            role: "Student Coordinator",
            name: "Utkarsh Priye (Jha)",
            contact: "99396 35206"
        },
        {
            emoji: "🧑‍🎓",
            role: "Student Coordinator",
            name: "Ritvik Vasundh",
            contact: "82996 86568"
        },
        {
            emoji: "🧑‍🎓",
            role: "Student Coordinator",
            name: "Jiya Patel",
            contact: "73832 32239"
        },
    ],
    webTeamHeads: [
        {
            emoji: "💻",
            role: "Web Team Head",
            name: "Rahul Jadvani",
            contact: "6362050449"
        },
    ],
    designTeamHead: {
        emoji: "🎨",
        role: "Design Team Head",
        name: "Design Team Head",
        contact: "Contact Info"
    },
    allMembers: [
        { emoji: "🧑‍🎓", label: "Team Member 1" },
        { emoji: "🧑‍🎓", label: "Team Member 2" },
        { emoji: "🧑‍🎓", label: "Team Member 3" },
        { emoji: "🧑‍🎓", label: "Team Member 4" },
        { emoji: "🧑‍🎓", label: "Team Member 5" },
        { emoji: "🧑‍🎓", label: "Team Member 6" },
        // ...add more as needed
    ],
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    <div className="team-card text-center">
                        <span className="mx-auto rounded-full w-24 h-24 text-5xl md:w-32 md:h-32 md:text-6xl lg:w-48 lg:h-48 lg:text-[8rem] flex items-center justify-center mb-4 border-4 border-blue-500 bg-white" style={{ height: 'auto' }}>
                            {team.professorCoordinator.emoji}
                        </span>
                        <p className="text-blue-600 font-medium">{team.professorCoordinator.role}</p>
                        <p className="text-gray-800 font-semibold mt-1 text-lg">{team.professorCoordinator.name}</p>
                        <p className="text-gray-600 text-sm">{team.professorCoordinator.designation}</p>
                    </div>
                    {team.studentCoordinators.map((member, idx) => (
                        <div className="team-card text-center" key={idx}>
                            <span className="mx-auto rounded-full w-24 h-24 text-5xl md:w-32 md:h-32 md:text-6xl lg:w-48 lg:h-48 lg:text-[8rem] flex items-center justify-center mb-4 border-4 border-green-500 bg-white" style={{ height: 'auto' }}>
                                <img src="/images/coords.png" alt="Coordinator" className="w-full h-full object-cover rounded-full" />
                            </span>
                            <p className="text-green-600 font-medium">{member.role}</p>
                            <p className="text-gray-800 font-semibold mt-1 text-lg">{member.name}</p>
                            <p className="text-gray-600 text-sm">{member.contact}</p>
                        </div>
                    ))}
                    {team.webTeamHeads.map((member, idx) => (
                        <div className="team-card text-center" key={idx}>
                            <span className="mx-auto rounded-full w-24 h-24 text-5xl md:w-32 md:h-32 md:text-6xl lg:w-48 lg:h-48 lg:text-[8rem] flex items-center justify-center mb-4 border-4 border-purple-500 bg-white" style={{ height: 'auto' }}>
                                <img src="/images/wenhead.png" alt="Web Team Head" className="w-full h-full object-cover rounded-full" />
                            </span>
                            <p className="text-purple-600 font-medium">{member.role}</p>
                            <p className="text-gray-800 font-semibold mt-1 text-lg">{member.name}</p>
                            <p className="text-gray-600 text-sm">{member.contact}</p>
                        </div>
                    ))}
                    <div className="team-card text-center">
                        <span className="mx-auto rounded-full w-24 h-24 text-5xl md:w-32 md:h-32 md:text-6xl lg:w-48 lg:h-48 lg:text-[8rem] flex items-center justify-center mb-4 border-4 border-pink-500 bg-white" style={{ height: 'auto' }}>
                            <img src="/images/deshead.png" alt="Design Team Head" className="w-full h-full object-cover rounded-full" />
                        </span>
                        <p className="text-pink-600 font-medium">{team.designTeamHead.role}</p>
                        <p className="text-gray-800 font-semibold mt-1 text-lg">{team.designTeamHead.name}</p>
                        <p className="text-gray-600 text-sm">{team.designTeamHead.contact}</p>
                    </div>
                </div>
                <h3 className="text-2xl font-semibold text-center mb-4">Meet the Entire Team</h3>
                <div className="flex justify-center" style={{ marginBottom: '4rem' }}>
                    <div className="relative overflow-hidden w-full h-full py-20">
                        <Carousel
                            slides={team.allMembers.slice(0, 6).map(member => ({
                                title: member.label,
                                button: "Explore Component",
                                src: member.emoji // Replace with image path if available
                            }))}
                        />
                    </div>
                </div>
            </div>
        </motion.section>
    );
}; 