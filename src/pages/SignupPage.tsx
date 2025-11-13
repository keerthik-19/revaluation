import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import Logo from '../components/Logo';
import { Hammer, Home } from 'lucide-react';

type UserType = 'homeowner' | 'contractor';

const SignupPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<UserType>('homeowner');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    companyName: '',
    license: '',
    yearsExperience: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    console.log('Signup data:', { ...formData, userType });
    
    // After signup, go to role selection
    navigate('/select-role');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <Logo width={50} height={50} />
            <span className="text-2xl font-bold text-foreground">Assemble</span>
          </div>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Create Your Account</CardTitle>
            <CardDescription className="text-center">
              Join Assemble to start your renovation journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Button
                type="button"
                variant={userType === 'homeowner' ? 'default' : 'outline'}
                className="h-20 flex-col gap-2"
                onClick={() => setUserType('homeowner')}
              >
                <Home className="h-6 w-6" />
                <span>Homeowner</span>
              </Button>
              <Button
                type="button"
                variant={userType === 'contractor' ? 'default' : 'outline'}
                className="h-20 flex-col gap-2"
                onClick={() => setUserType('contractor')}
              >
                <Hammer className="h-6 w-6" />
                <span>Contractor</span>
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleInputChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input type="tel" id="phone" name="phone" placeholder="(555) 123-4567" value={formData.phone} onChange={handleInputChange} required />
              </div>

              {userType === 'contractor' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleInputChange} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="license">License Number</Label>
                      <Input type="text" id="license" name="license" value={formData.license} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="yearsExperience">Years of Experience</Label>
                      <Input type="number" id="yearsExperience" name="yearsExperience" value={formData.yearsExperience} onChange={handleInputChange} required />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleInputChange} required minLength={8} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input type="password" id="confirmPassword" name="confirmPassword" placeholder="••••••••" value={formData.confirmPassword} onChange={handleInputChange} required minLength={8} />
              </div>

              <Button type="submit" className="w-full" size="lg">Create Account</Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Button variant="link" className="p-0 h-auto font-semibold" onClick={() => navigate('/login')}>Sign In</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
