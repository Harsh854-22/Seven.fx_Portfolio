"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Moon, Sun, Play, Instagram, Home, ChevronDown, Scissors, Zap, Video, Palette, Star } from "lucide-react"
import { useTheme } from "next-themes"

export default function SevenxPortfolio() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [playingVideo, setPlayingVideo] = useState<number | null>(null) // will use to track clicked video for showing only that frame

  const instagramUrl = "https://instagram.com/seven.fx_"
  
  // Remove playing/pausing videos, just keep muted sliding
  // On click redirect to Instagram
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredTool, setHoveredTool] = useState<string | null>(null)
  const reelsScrollRef = useRef<HTMLDivElement>(null)
  const testimonialsScrollRef = useRef<HTMLDivElement>(null)
  const firstVideoRef = useRef<HTMLVideoElement>(null)

  // Refs for the software expertise cards
  const capcutRef = useRef<HTMLDivElement>(null)
  const premiereRef = useRef<HTMLDivElement>(null)
  const aftereffectsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    // Auto-scroll animations - always run
    const reelsInterval = setInterval(() => {
      if (reelsScrollRef.current) {
        const container = reelsScrollRef.current
        const scrollAmount = container.scrollLeft + 300
        if (scrollAmount >= container.scrollWidth - container.clientWidth) {
          container.scrollTo({ left: 0, behavior: "smooth" })
        } else {
          container.scrollTo({ left: scrollAmount, behavior: "smooth" })
        }
      }
    }, 2000)

    const testimonialsInterval = setInterval(() => {
      if (testimonialsScrollRef.current) {
        const container = testimonialsScrollRef.current
        const scrollAmount = container.scrollLeft - 300
        if (scrollAmount <= 0) {
          container.scrollTo({ left: container.scrollWidth, behavior: "smooth" })
        } else {
          container.scrollTo({ left: scrollAmount, behavior: "smooth" })
        }
      }
    }, 2000)

    return () => {
      clearInterval(reelsInterval)
      clearInterval(testimonialsInterval)
    }
  }, []) // Remove playingVideo dependency

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleViewMyWorkClick = () => {
    scrollToSection("demo")
    // Auto-play first video after scrolling
    setTimeout(() => {
      if (firstVideoRef.current) {
        setPlayingVideo(0)
        firstVideoRef.current.play()
      }
    }, 1000)
  }

  const handleVideoClick = (index: number) => {
    // Redirect to Instagram on video click
    window.open(instagramUrl, "_blank")
  }

  const demoVideos = [
    { src: "/videos/SaveVid.Net_AQMU_aatK_IKea5i1r16TH4LTmhVaxFqR6EXN1mP9nSCBwywBAhOBVWnivlojkjtG2CLrQC29DzMCZBoI80mpZO_YW.mp4", title: "Social Media Campaign" },
    { src: "/videos/SaveVid.Net_AQNhxVgNe8tBg9s1nOPSjGPMUcS9t6McGySjp1mDGopj4xol-lI_2iJgg6-gbRtck6bKgVdNHKvYTKl4vonLLZ_0F2.mp4", title: "Corporate Presentation" },
    { src: "/videos/SaveVid.Net_AQNYltjZUlPzisld7CzgukX-sTcp5iAhdCC5mGMVOVduxmOSZz1AWhtL6qRgfUy3u0XKqcczYtnTcelOfUTxMrXqld.mp4", title: "Creative Montage" },
    { src: "/videos/SaveVid.Net_AQOpPc894lGcEKBoyvAHD1rFrW92V4AVTbxhsrbXLz4UW8KEqvjLgieWUTa7U7HJOrAJv90aV90ZBawCgsS9iM76lI.mp4", title: "Product Demo" },
    { src: "/videos/SaveVid.Net_AQOhSaqo9v4cKKLt5nXOsDZ-WWu1H2EhJ7qbgoZvyj_F7v1wl89yE4cYB9AvjEzHqgaS2r00uGASgACCJGPmJGidh0.mp4", title: "Event Highlight" },
    { src: "/videos/SaveVid.Net_AQNZXTUUYb1B_9RqqLzbp34KWWgZG1Nz_g21jhF1djxVVoACJjPpLdUmkUxrdsCIpMVpB8ZI9URGNyCI6Fqke1vgJB.mp4", title: "Testimonial Compilation" },
  ]

  const testimonials = [
    {
      text: "Working with this editor was a game-changer for our project. Their attention to detail and creative vision helped bring our vision to life. Highly recommend!",
      author: "@india",
    },
    {
      text: "Absolutely love the work! They took my content to the next level with their editing skills. Fast, professional, and top-notch quality every time.",
      author: "@_greynade_2.0",
    },
    {
      text: "A true professional! The editing was flawless, and the turnaround time was perfect. Couldn't ask for a better collaborator.",
      author: "@informed.in",
    },
    {
      text: "Amazing work! The editor brought out the essence of the footage in ways I couldn't have imagined. Highly skilled and easy to work with!",
      author: "@unfilteredbharat",
    },
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 relative overflow-x-hidden">
      {/* Custom Mouse Cursor for Tools */}
      {/* Removed global fixed cursor div */}

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => scrollToSection("home")}
                className="hover:scale-110 transition-transform"
              >
                <Home className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => scrollToSection("why-me")}
                className="hover:scale-110 transition-transform"
              >
                <Star className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => scrollToSection("software")}
                className="hover:scale-110 transition-transform"
              >
                <Zap className="h-5 w-5" />
              </Button>
            </div>

            <div
              className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
              style={{ fontFamily: "cursive" }}
            >
              Seven.fx_
            </div>

          <div className="flex items-center space-x-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => scrollToSection("demo")}
                className="hover:scale-110 transition-transform"
              >
                <Play className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => scrollToSection("testimonials")}
                className="hover:scale-110 transition-transform"
              >
                <Palette className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => scrollToSection("contact")}
                className="hover:scale-110 transition-transform"
              >
                {/* Add an icon for Contact similar to other icons */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25v7.5a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15.75v-7.5M21 8.25L12 13.5 3 8.25"
                  />
                </svg>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hover:scale-110 transition-transform"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation - No Hamburger Menu */}
          <div className="md:hidden">
            <div className="flex flex-col space-y-3">
              <div
                className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent text-center"
                style={{ fontFamily: "cursive" }}
              >
                Seven.fx_
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection("home")}
                  className="hover:scale-110 transition-transform"
                >
                  <Home className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection("why-me")}
                  className="hover:scale-110 transition-transform"
                >
                  <Star className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection("software")}
                  className="hover:scale-110 transition-transform"
                >
                  <Zap className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection("demo")}
                  className="hover:scale-110 transition-transform"
                >
                  <Play className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection("testimonials")}
                  className="hover:scale-110 transition-transform"
                >
                  <Palette className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="hover:scale-110 transition-transform"
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Background Video */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-20">
          <source src="/videos/SaveVid.Net_AQMU_aatK_IKea5i1r16TH4LTmhVaxFqR6EXN1mP9nSCBwywBAhOBVWnivlojkjtG2CLrQC29DzMCZBoI80mpZO_YW.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background/80" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <div
            className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 parallax-element"
              style={{
                transform: ``,
                transformStyle: "preserve-3d",
              }}
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Creative Video Editor
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Transforming raw footage into compelling visual stories that captivate audiences and bring your vision to
              life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={handleViewMyWorkClick}
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-pink-600 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:text-white"
              >
                View My Work
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </section>

      {/* Why Me Section */}
      <section id="why-me" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div
            className="max-w-4xl mx-auto parallax-element"
                style={{
                  transform: ``,
                  transformStyle: "preserve-3d",
                }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              WHY ME?
            </h2>

            <div className="space-y-8 text-lg leading-relaxed">
              <p className="text-center text-muted-foreground">
                With three years of expertise in the dynamic field of video editing, I've had the opportunity to work on
                a variety of projects, including sharp social media clips, intriguing corporate videos, and immersive
                feature-length films.
              </p>

              <p>
                What sets me unique is not simply my technical proficiency, but also my ability to communicate your
                narrative in the most appealing way imaginable. I'm interested in making videos that people can feel
                rather than just see. With my knowledge of programs such as CapCut, Premiere Pro, and After Effects, I
                can adapt to any style or genre, flawlessly merging creativity and accuracy.
              </p>

              <h3 className="text-2xl font-semibold text-primary mt-12 mb-6">Why Should You Choose Me?</h3>

              <div className="grid md:grid-cols-3 gap-8">
                <Card
                  className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-primary/10 card-3d"
                style={{
                  transform: ``,
                  transformStyle: "preserve-3d",
                }}
                >
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <Zap className="h-8 w-8 text-primary mr-3" />
                      <h4 className="text-xl font-semibold">Versatility at its best</h4>
                    </div>
                    <p className="text-muted-foreground">
                      No project is too large or small. I have the expertise to create a fast-paced YouTube commercial
                      or a cinematic masterpiece.
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-primary/10 card-3d"
                style={{
                  transform: ``,
                  transformStyle: "preserve-3d",
                }}
                >
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <Scissors className="h-8 w-8 text-primary mr-3" />
                      <h4 className="text-xl font-semibold">Attention to Detail</h4>
                    </div>
                    <p className="text-muted-foreground">
                      Each frame counts. I'm all about the final touch that elevates a decent video to greatness.
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-primary/10 card-3d"
                style={{
                  transform: ``,
                  transformStyle: "preserve-3d",
                }}
                >
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <Palette className="h-8 w-8 text-primary mr-3" />
                      <h4 className="text-xl font-semibold">Creative & Collaborative</h4>
                    </div>
                    <p className="text-muted-foreground">
                      I do more than simply edit; I also provide suggestions. Your vision and my experience combine to
                      create a memorable video.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Software Expertise Section */}
      <section id="software" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Software Expertise
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card
            className="p-8 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer card-3d relative"
          onMouseEnter={() => {
            setHoveredTool("capcut")
          }}
          onMouseLeave={() => {
            setHoveredTool(null)
          }}
          onMouseMove={(e) => {
            if (capcutRef.current) {
              const rect = capcutRef.current.getBoundingClientRect()
              if (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
              ) {
                setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
              }
            }
          }}
          ref={capcutRef}
          style={{
            transform: ``,
            transformStyle: "preserve-3d",
            cursor: hoveredTool === "capcut" ? "none" : "auto",
          }}
        >
          <CardContent className="p-0">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center hover:rotate-12 transition-transform duration-300">
              <Scissors className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">CapCut</h3>
            <p className="text-muted-foreground">
              Perfect for quick, dynamic social media content and mobile-first editing workflows with intuitive
              controls.
            </p>
            {hoveredTool === "capcut" && (
              <div
                className="absolute pointer-events-none z-50"
                style={{
                  left: mousePosition.x,
                  top: mousePosition.y,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Scissors className="h-8 w-8 text-green-500 animate-pulse cursor-scissor" />
              </div>
            )}
          </CardContent>
        </Card>

          <Card
            className="p-8 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer card-3d relative"
          onMouseEnter={() => {
            setHoveredTool("premiere")
          }}
          onMouseLeave={() => {
            setHoveredTool(null)
          }}
          onMouseMove={(e) => {
            if (premiereRef.current) {
              const rect = premiereRef.current.getBoundingClientRect()
              if (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
              ) {
                setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
              }
            }
          }}
          ref={premiereRef}
          style={{
            transform: ``,
            transformStyle: "preserve-3d",
            cursor: hoveredTool === "premiere" ? "none" : "auto",
          }}
        >
          <CardContent className="p-0">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center hover:rotate-12 transition-transform duration-300">
              <Video className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Adobe Premiere Pro</h3>
            <p className="text-muted-foreground">
              Industry-standard editing for professional projects, seamless workflows, and advanced color
              correction.
            </p>
            {hoveredTool === "premiere" && (
              <div
                className="absolute pointer-events-none z-50"
                style={{
                  left: mousePosition.x,
                  top: mousePosition.y,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="w-8 h-8 bg-purple-500 rounded-full animate-bounce cursor-tail" />
              </div>
            )}
          </CardContent>
        </Card>

          <Card
            className="p-8 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer card-3d relative"
          onMouseEnter={() => {
            setHoveredTool("aftereffects")
          }}
          onMouseLeave={() => {
            setHoveredTool(null)
          }}
          onMouseMove={(e) => {
            if (aftereffectsRef.current) {
              const rect = aftereffectsRef.current.getBoundingClientRect()
              if (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
              ) {
                setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
              }
            }
          }}
          ref={aftereffectsRef}
          style={{
            transform: ``,
            transformStyle: "preserve-3d",
            cursor: hoveredTool === "aftereffects" ? "none" : "auto",
          }}
        >
          <CardContent className="p-0">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-400 to-red-600 rounded-2xl flex items-center justify-center hover:rotate-12 transition-transform duration-300">
              <Zap className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Adobe After Effects</h3>
            <p className="text-muted-foreground">
              Motion graphics, visual effects, and compositing for cinematic storytelling and brand animations.
            </p>
            {hoveredTool === "aftereffects" && (
              <div
                className="absolute pointer-events-none z-50"
                style={{
                  left: mousePosition.x,
                  top: mousePosition.y,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Zap className="h-8 w-8 text-orange-500 animate-ping cursor-lightning" />
              </div>
            )}
          </CardContent>
        </Card>
          </div>
        </div>
      </section>

      {/* Demo Section - Full Width */}
      <section id="demo" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Demo Reel
          </h2>

          <div
            ref={reelsScrollRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollBehavior: "smooth" }}
          >
          {demoVideos.map((video, index) => (
              <div key={index} className="relative flex-shrink-0">
                <Card
                  className="flex-shrink-0 w-80 group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer card-3d"
                  onClick={() => handleVideoClick(index)}
                  style={{
                    transformStyle: "preserve-3d",
                    transition: 'all 0.3s ease',
                    animation: 'rotateYAnimation 10s linear infinite',
                    perspective: '1000px',
                  }}
                >
                  <div className="relative aspect-video">
                    <video
                      ref={index === 0 ? firstVideoRef : null}
                      className="w-full h-full object-cover"
                      loop
                      muted
                      playsInline
                      autoPlay
                      controls={false}
                      onMouseEnter={(e) => {
                        e.currentTarget.play();
                      }}
                      onMouseLeave={(e) => {
                        // Remove pause on mouse leave to keep continuous playing
                        // e.currentTarget.pause();
                        // e.currentTarget.currentTime = 0;
                      }}
                    >
                      <source src={video.src} type="video/mp4" />
                    </video>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Full Width */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            What Clients Say
          </h2>

          <div
            ref={testimonialsScrollRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollBehavior: "smooth" }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <Card
                key={index}
                className="flex-shrink-0 w-80 p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 card-3d"
                style={{
                  transform: ``,
                  transformStyle: "preserve-3d",
                }}
              >
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 text-sm">"{testimonial.text}"</p>
                  <div className="font-semibold text-primary">{testimonial.author}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-lg">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Contact
          </h2>
          <form
            action="https://formspree.io/f/xgvkjeln"
            method="POST"
            className="flex flex-col space-y-6 bg-background p-8 rounded-lg shadow-lg"
          >
            <label className="flex flex-col text-lg font-medium text-foreground">
              Your email:
              <input
                type="email"
                name="email"
                required
                className="mt-2 p-3 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="you@example.com"
              />
            </label>
            <label className="flex flex-col text-lg font-medium text-foreground">
              Your message:
              <textarea
                name="message"
                required
                rows={6}
                className="mt-2 p-3 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Write your message here..."
              />
            </label>
            <button
              type="submit"
              className="bg-gradient-to-r from-primary to-purple-600 text-white py-3 rounded-md font-semibold hover:scale-105 transition-transform duration-300"
            >
              Send
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <div
              className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
              style={{ fontFamily: "cursive" }}
            >
              Seven.fx_
            </div>
            <p className="text-muted-foreground">Transforming visions into visual masterpieces</p>
            <div className="flex justify-center space-x-6">
              <Button variant="ghost" size="icon" asChild className="hover:scale-110 transition-transform">
                <a href="https://instagram.com/seven.fx_" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="hover:scale-110 transition-transform">
                <a href="/">
                  <Home className="h-5 w-5" />
                </a>
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">© 2024 Seven.fx_ Portfolio. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
