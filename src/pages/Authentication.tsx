
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Check, LogIn, Mail, Phone, Shield, ShieldCheck, Upload, User, UserPlus } from 'lucide-react';
import Navbar from '@/components/Navbar';

// Define form schemas for validation
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  rememberMe: z.boolean().optional(),
});

const signupSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string().min(8, { message: "Please confirm your password" }),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const twoFactorSchema = z.object({
  otp: z.string().length(6, { message: "Please enter the 6-digit code" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;
type TwoFactorFormValues = z.infer<typeof twoFactorSchema>;

// Authentication step types
type AuthStep = 'login' | 'signup' | '2fa' | 'kyc';

const Authentication = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State for controlling the auth flow
  const [activeTab, setActiveTab] = useState<string>("login");
  const [currentStep, setCurrentStep] = useState<AuthStep>("login");
  const [isKycDialogOpen, setIsKycDialogOpen] = useState(false);
  const [isKycComplete, setIsKycComplete] = useState(false);
  const [kyc2faComplete, setKyc2faComplete] = useState(false);
  
  // Initialize forms
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  
  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    },
  });
  
  const twoFactorForm = useForm<TwoFactorFormValues>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      otp: "",
    },
  });
  
  // Check URL params for signup intent
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('signup') === 'true') {
      setActiveTab("signup");
    }
  }, [location]);
  
  // Handle form submissions
  const onLoginSubmit = (data: LoginFormValues) => {
    console.log("Login submitted:", data);
    // In a real app, you would validate credentials with an API
    toast({
      title: "Login Successful",
      description: "Redirecting you to 2FA verification...",
    });
    setCurrentStep("2fa");
  };
  
  const onSignupSubmit = (data: SignupFormValues) => {
    console.log("Signup submitted:", data);
    // In a real app, you would register the user with an API
    toast({
      title: "Account Created",
      description: "Please verify your identity to complete the signup process.",
    });
    setCurrentStep("kyc");
  };
  
  const onTwoFactorSubmit = (data: TwoFactorFormValues) => {
    console.log("2FA verification submitted:", data);
    // In a real app, you would verify the 2FA code with an API
    toast({
      title: "Two-Factor Authentication Successful",
      description: currentStep === "2fa" ? "Logging you in..." : "KYC verification complete.",
    });
    
    if (currentStep === "2fa") {
      // Redirect to dashboard after successful login
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } else if (currentStep === "kyc") {
      setKyc2faComplete(true);
      // After KYC 2FA verification, proceed to the document verification
      setIsKycDialogOpen(true);
    }
  };
  
  const completeKyc = () => {
    setIsKycComplete(true);
    setIsKycDialogOpen(false);
    toast({
      title: "KYC Verification Complete",
      description: "Your account has been fully verified.",
    });
    // After KYC verification, redirect to dashboard
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Information */}
          <div className="hidden lg:flex flex-col justify-center p-8 bg-gradient-to-br from-commodity-blue to-blue-900 text-white rounded-lg shadow-xl">
            <h1 className="text-3xl font-bold mb-6">Welcome to CommodityHub</h1>
            <p className="text-lg mb-8">
              Your secure gateway to the global commodities market.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-white/10 p-2 rounded-full">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Secure Authentication</h3>
                  <p className="text-white/80">Industry-standard security protocols to protect your account.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-white/10 p-2 rounded-full">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Two-Factor Authentication</h3>
                  <p className="text-white/80">Extra security layer to ensure only you can access your account.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-white/10 p-2 rounded-full">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">KYC Verification</h3>
                  <p className="text-white/80">Regulatory compliance to ensure a safe trading environment.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Forms */}
          <div>
            {currentStep === "login" || currentStep === "signup" ? (
              <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login" className="text-base">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="text-base">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Sign Up
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <Card>
                    <CardHeader>
                      <CardTitle>Login to Your Account</CardTitle>
                      <CardDescription>Enter your credentials to access the platform.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...loginForm}>
                        <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                          <FormField
                            control={loginForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                                    <Mail className="ml-3 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="you@example.com" className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" {...field} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={loginForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex items-center justify-between">
                            <FormField
                              control={loginForm.control}
                              name="rememberMe"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <Checkbox 
                                      checked={field.value} 
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal cursor-pointer">Remember me</FormLabel>
                                </FormItem>
                              )}
                            />
                            
                            <Button variant="link" className="p-0 h-auto text-sm" type="button">
                              Forgot password?
                            </Button>
                          </div>
                          
                          <Button type="submit" className="w-full bg-commodity-gold hover:bg-amber-600">
                            Login
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="signup">
                  <Card>
                    <CardHeader>
                      <CardTitle>Create an Account</CardTitle>
                      <CardDescription>Join our platform to start trading commodities.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...signupForm}>
                        <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                          <FormField
                            control={signupForm.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                                    <User className="ml-3 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="John Doe" className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" {...field} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={signupForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                                    <Mail className="ml-3 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="you@example.com" className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" {...field} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={signupForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={signupForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={signupForm.control}
                            name="termsAccepted"
                            render={({ field }) => (
                              <FormItem className="flex items-start space-x-2 space-y-0">
                                <FormControl>
                                  <Checkbox 
                                    checked={field.value} 
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-sm font-normal cursor-pointer">
                                    I agree to the terms of service and privacy policy
                                  </FormLabel>
                                  <FormMessage />
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <Button type="submit" className="w-full bg-commodity-gold hover:bg-amber-600">
                            Create Account
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : currentStep === "2fa" ? (
              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Enter the verification code sent to your device.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...twoFactorForm}>
                    <form onSubmit={twoFactorForm.handleSubmit(onTwoFactorSubmit)} className="space-y-4">
                      <div className="flex flex-col items-center space-y-6">
                        <div className="bg-commodity-blue/10 p-4 rounded-full">
                          <Shield className="h-10 w-10 text-commodity-blue" />
                        </div>
                        
                        <p className="text-center text-sm text-muted-foreground max-w-sm">
                          We've sent a 6-digit code to your registered phone number. Please enter it below to verify your identity.
                        </p>
                        
                        <FormField
                          control={twoFactorForm.control}
                          name="otp"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl>
                                <InputOTP maxLength={6} {...field}>
                                  <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                  </InputOTPGroup>
                                </InputOTP>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            Didn't receive the code? <Button variant="link" className="p-0 h-auto" type="button">Resend</Button>
                          </span>
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full bg-commodity-gold hover:bg-amber-600">
                        Verify
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            ) : currentStep === "kyc" && !kyc2faComplete ? (
              <Card>
                <CardHeader>
                  <CardTitle>KYC Verification - Step 1</CardTitle>
                  <CardDescription>Complete two-factor authentication to proceed with identity verification.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...twoFactorForm}>
                    <form onSubmit={twoFactorForm.handleSubmit(onTwoFactorSubmit)} className="space-y-4">
                      <div className="flex flex-col items-center space-y-6">
                        <div className="bg-commodity-blue/10 p-4 rounded-full">
                          <User className="h-10 w-10 text-commodity-blue" />
                        </div>
                        
                        <p className="text-center text-sm text-muted-foreground max-w-sm">
                          As part of our Know Your Customer (KYC) process, we need to verify your identity. 
                          We've sent a verification code to your registered phone number.
                        </p>
                        
                        <FormField
                          control={twoFactorForm.control}
                          name="otp"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl>
                                <InputOTP maxLength={6} {...field}>
                                  <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                  </InputOTPGroup>
                                </InputOTP>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Button type="submit" className="w-full bg-commodity-gold hover:bg-amber-600">
                        Verify and Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      </div>

      {/* KYC Document Upload Dialog */}
      <Dialog open={isKycDialogOpen} onOpenChange={setIsKycDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>KYC Verification - Step 2</DialogTitle>
            <DialogDescription>
              Upload your identification documents to complete the verification process.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Identification Document</h3>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        Passport, Driver's License, or National ID Card
                      </p>
                    </div>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Proof of Address</h3>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        Utility bill or bank statement (less than 3 months old)
                      </p>
                    </div>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsKycDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="button" 
              className="bg-commodity-gold hover:bg-amber-600" 
              onClick={completeKyc}
            >
              Submit Documents
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Success Message after KYC completion */}
      {isKycComplete && (
        <Drawer open={isKycComplete} onOpenChange={setIsKycComplete}>
          <DrawerContent>
            <DrawerHeader className="text-center">
              <DrawerTitle className="text-2xl">Verification Complete</DrawerTitle>
              <DrawerDescription>Your account has been successfully verified</DrawerDescription>
            </DrawerHeader>
            <div className="flex items-center justify-center py-6">
              <div className="bg-green-100 p-4 rounded-full">
                <Check className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <div className="px-4 text-center pb-4">
              <p className="text-muted-foreground">
                Thank you for completing the KYC verification process. You now have full access to the CommodityHub platform.
              </p>
            </div>
            <DrawerFooter>
              <Button className="bg-commodity-gold hover:bg-amber-600" onClick={() => navigate("/dashboard")}>
                Go to Dashboard
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default Authentication;
