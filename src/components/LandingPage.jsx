import React, { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardContent } from "../components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import GradualBlur from "../components/ui/gradual-blur";
import LiquidEther from "../components/ui/LiquidEther";
import Spline from "@splinetool/react-spline";
import { toast } from "sonner";
import { events, team, sparks } from "../mock";
import { useReveal } from "../hooks/useReveal";
import { ChevronDown } from "lucide-react";

const NeonText = ({ children, className = "" }) => (
    <h2 className={`text-white drop-shadow-[0_0_14px_rgba(0,255,209,0.25)] ${className}`}>
        {children}
    </h2>
);

// 3D tilt team card
const TeamCard3D = ({ member, index }) => {
    const innerRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMove = (e) => {
        const el = innerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rx = (0.5 - py) * 10;
        const ry = (px - 0.5) * 12;
        el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    };

    const handleEnter = () => {
        setIsHovered(true);
    };

    const handleLeave = () => {
        const el = innerRef.current;
        if (!el) return;
        el.style.transform = `rotateX(0deg) rotateY(0deg)`;
        setIsHovered(false);
    };

    const imgUrl = `https://picsum.photos/seed/${member.id}-${index}/640/880`;

    return (
        <div className="card3d reveal-scale">
            <div
                ref={innerRef}
                className="card3d-inner"
                onMouseMove={handleMove}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
            >
                <div className="relative overflow-hidden rounded-xl border border-white/15 bg-[#0b0b0b]">
                    <img
                        src={imgUrl}
                        alt={`${member.name} - ${member.role}`}
                        className={`w-full h-72 object-cover transition duration-500 filter contrast-110 ${isHovered
                            ? 'grayscale-0 saturate-150'
                            : 'grayscale'
                            }`}

                    />
                    <div
                        className={`absolute inset-0 pointer-events-none transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'
                            }`}
                        style={{
                            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.25), 0 0 60px rgba(0,255,209,0.12)"
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-white/90 font-semibold tracking-tight">{member.name}</div>
                                <div className="text-white/60 text-xs">{member.role}</div>
                            </div>
                            <div className="w-2 h-8 bg-[#00FFD1]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function LandingPage() {
    const [audioOn, setAudioOn] = useState(false);
    const audioRef = useRef(null);

    useReveal();

    // Auto-start music on component mount
    useEffect(() => {
        const startAudio = async () => {
            try {
                if (!audioRef.current) {
                    audioRef.current = new Audio('/assets/Interstellar Official Soundtrack  Cornfield Chase  Hans Zimmer  WaterTower.mp3');
                    audioRef.current.loop = true;
                    audioRef.current.volume = 0.25; // Set volume to 25%
                }
                await audioRef.current.play();
                setAudioOn(true);
                toast.success("Cinematic audio started", { duration: 2000 });
            } catch (e) {
                console.log("Autoplay blocked by browser - user interaction required");
                // Don't show error toast for autoplay blocking, it's expected
            }
        };

        // Small delay to let the page load first
        const timer = setTimeout(startAudio, 1000);
        return () => clearTimeout(timer);
    }, []);

    const toggleAudio = async () => {
        if (!audioOn) {
            try {
                if (!audioRef.current) {
                    audioRef.current = new Audio('/assets/Interstellar Official Soundtrack  Cornfield Chase  Hans Zimmer  WaterTower.mp3');
                    audioRef.current.loop = true;
                    audioRef.current.volume = 0.3; // Set volume to 30%
                }
                await audioRef.current.play();
                setAudioOn(true);
                toast.success("Cinematic audio playing");
            } catch (e) {
                console.error(e);
                toast.error("Audio playback blocked by browser");
            }
        } else {
            try {
                if (audioRef.current) {
                    audioRef.current.pause();
                }
            } catch { }
            setAudioOn(false);
            toast("Audio paused");
        }
    };

    // Scroll-reactive CSS vars for hero Spline
    useEffect(() => {
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const y = window.scrollY;
                    const t = Math.min(1, y / 600);
                    document.documentElement.style.setProperty("--spline-scale", `${1 + t * 0.06}`);
                    document.documentElement.style.setProperty("--spline-shift", `${t * 40}px`);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const onRegister = () => {
        toast.info("Mock: Registration opens soon");
    };

    useEffect(() => {
        const handler = () => onRegister();
        window.addEventListener('cta-register', handler);
        return () => window.removeEventListener('cta-register', handler);
    }, []);

    return (
        <div className="dark-container" style={{ position: 'relative' }}>

            {/* Global Gradual Blur Effect */}
            <GradualBlur
                target="page"
                position="bottom"
                height="15rem"
                strength={4}
                divCount={10}
                curve="bezier"
                exponential={true}
                opacity={0.9}
                zIndex={10}
            />

            {/* HERO: Title/buttons and full-span Spline in the SAME section */}
            <section className="relative hero-section">
                {/* Spline behind, spanning full viewport */}
                <div className="hero-spline-bg" aria-hidden>
                    <div className="hero-spline-inner">
                        <Spline scene="https://prod.spline.design/NbVmy6DPLhY-5Lvg/scene.splinecode" />
                    </div>
                    <div className="hero-spline-overlay-left" />
                </div>

                {/* Foreground copy with container */}
                <div className="dark-content-container relative z-10">
                    <div className="space-y-6 hero-content">
                        <NeonText className="display-huge reveal-up">IEDC BOOTCAMP CEC</NeonText>
                        <p className="body-medium text-white/80 max-w-xl reveal-up" data-delay="80ms">
                            A story of innovation. Aspire to Inspire.
                        </p>
                        <div className="flex items-center gap-4 reveal-up" data-delay="140ms">
                            <Button className="btn-primary dark-button-animate" onClick={onRegister}>
                                Register Now
                            </Button>
                            <Button variant="outline" className="btn-secondary" onClick={() => window.location.hash = '#bootcamp'}>
                                Learn More
                            </Button>
                            <Button variant="ghost" className={`btn-secondary ${audioOn ? 'ring-1 ring-[#00FFD1]/60' : ''}`} onClick={toggleAudio}>
                                {audioOn ? '🔊 Mute Audio' : '🔇 Enable Audio'}
                            </Button>
                        </div>
                        <div className="scroll-cue reveal-fade" data-delay="220ms">
                            <ChevronDown size={24} className="text-white/70" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Scene 2: Spark of Innovation */}
            <section className="dark-content-container section-space">
                <div className="text-center mb-12">
                    <NeonText className="display-medium reveal-fade">The Spark of Innovation</NeonText>
                    <p className="body-small text-white/70 reveal-fade" data-delay="80ms">
                        Three pillars that ignite entrepreneurial excellence
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {sparks.map((spark, i) => (
                        <div key={spark.id} className="glass p-8 rounded-xl border border-white/15 dark-hover reveal-up" data-delay={`${i * 100}ms`}>
                            <div className="text-4xl mb-4 reveal-scale" data-delay={`${i * 100 + 50}ms`}>
                                {spark.icon}
                            </div>
                            <NeonText className="heading-1 mb-4">{spark.title}</NeonText>
                            <p className="body-small text-white/70 leading-relaxed">
                                {spark.description}
                            </p>
                            <div className="mt-6 h-1 w-full bg-gradient-to-r from-[#00FFD1]/20 via-[#00FFD1]/60 to-transparent rounded-full" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Scene 3: Mission */}
            <section className="dark-content-container section-space">
                <div className="text-center max-w-4xl mx-auto">
                    <NeonText className="display-large reveal-fade">
                        Empowering Students to Innovate, Create, and Lead.
                    </NeonText>
                    <p className="body-medium text-white/70 mt-4 reveal-fade" data-delay="120ms">
                        Programs, mentorship, and community to launch ventures from campus.
                    </p>
                </div>
            </section>

            {/* Scene 4: Bootcamp Events */}
            <section className="dark-content-container section-space">
                <div className="mb-10">
                    <NeonText className="display-medium reveal-fade">The Bootcamp</NeonText>
                    <p className="body-small text-white/60 reveal-fade" data-delay="80ms">
                        Hover to preview. Click to mock-expand.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {events.map((ev, i) => (
                        <Card key={ev.id} className="group bg-[#121212] border-white/15 rounded-xl overflow-hidden relative dark-hover transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(0,255,209,0.15)] reveal-up" data-delay={`${i * 80}ms`}>
                            <CardHeader className="p-0">
                                <div className="p-6">
                                    <div className="text-xs tracking-wide text-[#00FFD1]">{ev.tag}</div>
                                    <NeonText className="heading-1 mt-1">{ev.title}</NeonText>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 pt-0">
                                <p className="body-small text-white/70 min-h-[72px]">{ev.description}</p>
                                <div className="flex items-center justify-between mt-6">
                                    <span className="text-white/50 text-xs">{ev.meta}</span>
                                    <Button className="btn-secondary" onClick={() => toast("Mock: Details coming soon")}>
                                        View
                                    </Button>
                                </div>
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{
                                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.25), 0 0 60px rgba(0,255,209,0.12)"
                                }} />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Scene 5: The People */}
            <section className="dark-content-container section-space">
                <div className="text-center mb-12">
                    <NeonText className="display-medium reveal-fade">The People</NeonText>
                    <p className="body-small text-white/70 reveal-fade" data-delay="100ms">
                        Futuristic monochrome portraits that spring to life on hover
                    </p>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {team.map((m, i) => (
                        <TeamCard3D key={m.id} member={m} index={i} />
                    ))}
                </div>
            </section>

            {/* Scene 6: Journey Ahead */}
            <section className="dark-content-container section-space">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <NeonText className="display-large reveal-up">The Journey Ahead</NeonText>
                        <p className="body-medium text-white/70 mt-4 reveal-up" data-delay="80ms">
                            Zooming out to a horizon of startups. CEC to the skyline.
                        </p>
                    </div>
                    <div className="relative h-64 reveal-up" data-delay="120ms">
                        <div className="absolute bottom-0 left-4 w-10 h-24 bg-white/10 border border-white/20 backdrop-blur-sm" />
                        <div className="absolute bottom-0 left-20 w-14 h-40 bg-white/10 border border-white/20 backdrop-blur-sm" />
                        <div className="absolute bottom-0 left-40 w-12 h-32 bg-white/10 border border-white/20 backdrop-blur-sm" />
                        <div className="absolute bottom-0 left-56 w-16 h-56 bg-white/10 border border-white/20 backdrop-blur-sm" />
                        <div className="absolute bottom-0 left-80 w-10 h-28 bg-white/10 border border-white/20 backdrop-blur-sm" />
                        <div className="absolute -top-4 right-8 w-20 h-20 rounded-full border border-[#00FFD1]/60 bg-[#00FFD1]/10 backdrop-blur-sm" />
                    </div>
                </div>
            </section>

            {/* Scene 7: CTA */}
            <section className="dark-content-container section-space">
                <div className="glass p-10 rounded-xl border border-white/15 text-center reveal-scale">
                    <NeonText className="display-large">Join the Movement. Be the Next Innovator.</NeonText>
                    <p className="body-medium text-white/70 mt-3">IEDC CEC • College of Engineering Chengannur</p>
                    <div className="mt-8 flex items-center justify-center gap-4">
                        <Button className="btn-primary dark-button-animate" onClick={onRegister}>
                            Register Now
                        </Button>
                        <Button className="btn-secondary" onClick={() => window.location.hash = '#mission'}>
                            Learn More
                        </Button>
                    </div>
                </div>
            </section>

            {/* FAQ with stylish accordion */}
            <section className="dark-content-container section-space">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div>
                        <NeonText className="display-medium reveal-fade">FAQs</NeonText>
                        <p className="body-small text-white/70 mt-2 reveal-fade" data-delay="80ms">
                            Quick answers about the experience
                        </p>
                    </div>
                    <Accordion type="single" collapsible className="w-full reveal-up">
                        <AccordionItem value="item-1" className="border-b border-white/15">
                            <AccordionTrigger className="text-white">FAQ SECTION</AccordionTrigger>
                            <AccordionContent className="text-white/70">
                                currently faqs about this website.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="border-b border-white/15">
                            <AccordionTrigger className="text-white">Will there be audio?</AccordionTrigger>
                            <AccordionContent className="text-white/70">
                                A subtle ambient hum can be toggled on or off.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" className="border-b border-white/15">
                            <AccordionTrigger className="text-white">How do I register?</AccordionTrigger>
                            <AccordionContent className="text-white/70">
                                Use the Register Now button. It triggers a mocked toast for this preview.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>
        </div>
    );
}