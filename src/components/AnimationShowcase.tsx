import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle, Home, Clock, FileText } from "lucide-react";

/**
 * Animation Showcase Component
 * Demonstrates all available animations for the homeowner dashboard
 */
const AnimationShowcase = () => {
  return (
    <div className="space-y-8 p-6">
      <h2 className="text-2xl font-bold text-green-600 mb-6">Animation Examples</h2>

      {/* Fade In Animations */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">1. Fade In Effects</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="animate-fade-in border-green-500">
            <CardHeader>
              <CardTitle>Fade In</CardTitle>
            </CardHeader>
            <CardContent>Basic fade in animation</CardContent>
          </Card>
          
          <Card className="animate-fade-in-up border-green-500">
            <CardHeader>
              <CardTitle>Fade In Up</CardTitle>
            </CardHeader>
            <CardContent>Fades in while moving up</CardContent>
          </Card>
          
          <Card className="animate-fade-in-down border-green-500">
            <CardHeader>
              <CardTitle>Fade In Down</CardTitle>
            </CardHeader>
            <CardContent>Fades in while moving down</CardContent>
          </Card>
        </div>
      </section>

      {/* Slide Animations */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">2. Slide Effects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="animate-slide-in-left border-green-500">
            <CardHeader>
              <CardTitle>Slide In Left</CardTitle>
            </CardHeader>
            <CardContent>Slides in from the left</CardContent>
          </Card>
          
          <Card className="animate-slide-in-right border-green-500">
            <CardHeader>
              <CardTitle>Slide In Right</CardTitle>
            </CardHeader>
            <CardContent>Slides in from the right</CardContent>
          </Card>
        </div>
      </section>

      {/* Scale & Bounce */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">3. Scale & Bounce</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="animate-scale-in border-green-500">
            <CardHeader>
              <CardTitle>Scale In</CardTitle>
            </CardHeader>
            <CardContent>Scales up smoothly</CardContent>
          </Card>
          
          <Card className="animate-bounce-in border-green-500">
            <CardHeader>
              <CardTitle>Bounce In</CardTitle>
            </CardHeader>
            <CardContent>Bounces in with energy!</CardContent>
          </Card>
        </div>
      </section>

      {/* Staggered Cards (Timeline Effect) */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">4. Staggered Animation (Timeline)</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: Home, title: "Foundation", delay: 0 },
            { icon: Clock, title: "Framing", delay: 100 },
            { icon: FileText, title: "Drywall", delay: 200 },
            { icon: CheckCircle, title: "Finishing", delay: 300 }
          ].map((item, index) => (
            <Card 
              key={index}
              className="animate-fade-in-up border-green-500"
              style={{ animationDelay: `${item.delay}ms` }}
            >
              <CardContent className="pt-6 text-center">
                <item.icon className="mx-auto mb-2 text-green-600" size={32} />
                <h4 className="font-semibold">{item.title}</h4>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Interactive Hover Effects */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">5. Hover Effects (Hover over cards)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-green-500 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
            <CardHeader>
              <CardTitle>Scale Up</CardTitle>
            </CardHeader>
            <CardContent>Grows on hover</CardContent>
          </Card>
          
          <Card className="border-green-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer">
            <CardHeader>
              <CardTitle>Lift Up</CardTitle>
            </CardHeader>
            <CardContent>Lifts up on hover</CardContent>
          </Card>
          
          <Card className="border-green-500 transition-all duration-300 hover:border-green-700 hover:bg-green-50 cursor-pointer">
            <CardHeader>
              <CardTitle>Color Change</CardTitle>
            </CardHeader>
            <CardContent>Changes color on hover</CardContent>
          </Card>
        </div>
      </section>

      {/* Progress Bar Animation */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">6. Progress Animation</h3>
        <Card className="border-green-500">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <p className="mb-2 font-medium">Project Progress: 65%</p>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-600 animate-progress-fill"
                    style={{ width: "65%" }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Pulse Effect (Current Week Indicator) */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">7. Pulse Effect (Current Week)</h3>
        <Card className="border-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-600 rounded-full animate-pulse-soft flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <p className="font-semibold">Week 3 (Current)</p>
                <p className="text-sm text-gray-600">Drywall & Electrical</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Building House Animation Demo */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">8. Progressive Building (House)</h3>
        <Card className="border-green-500">
          <CardContent className="pt-6">
            <div className="flex items-end justify-center gap-4 h-64">
              {/* Foundation */}
              <div className="w-16 bg-gray-800 rounded animate-build-up" style={{ animationDelay: "0ms", height: "30%" }}>
                <p className="text-white text-xs text-center mt-2">Foundation</p>
              </div>
              {/* Framing */}
              <div className="w-16 bg-yellow-700 rounded animate-build-up" style={{ animationDelay: "200ms", height: "50%" }}>
                <p className="text-white text-xs text-center mt-2">Framing</p>
              </div>
              {/* Walls */}
              <div className="w-16 bg-blue-500 rounded animate-build-up" style={{ animationDelay: "400ms", height: "70%" }}>
                <p className="text-white text-xs text-center mt-2">Walls</p>
              </div>
              {/* Finishing */}
              <div className="w-16 bg-green-600 rounded animate-build-up" style={{ animationDelay: "600ms", height: "90%" }}>
                <p className="text-white text-xs text-center mt-2">Finish</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default AnimationShowcase;
