import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useStore from "../store/store";
import { Mail, Lock, User } from "lucide-react";
import { getCurrentUser } from "../api/appwrite";
import LoadingComp from "../components/LoadingComp";

interface AuthFormData {
  email: string;
  password: string;
  name?: string;
}

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>();

  const navigate = useNavigate();
  const { login, register: registerUser } = useStore();

  const onSubmit = async (data: AuthFormData) => {
    try {
      if (isLogin) {
        await login(data.email, data.password);
      } else {
        if (data.name) {
          await registerUser(data.email, data.password, data.name);
        }
      }
      navigate("/profile");
    } catch (error) {
      alert(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const checkUserLoggedIn = async () => {
    setIsLoading(true);
    try {
      const currentUser = await getCurrentUser();

      if (currentUser) {
        const role =
          currentUser.email === "admin@example.com" ? "admin" : "user";

        useStore.setState({
          user: {
            id: currentUser.$id,
            email: currentUser.email,
            name: currentUser.name,
            role,
          },
        });

        navigate("/profile");
      }
    } catch (error) {
      console.log("Error fetching current user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  if (isLoading) {
    return <LoadingComp />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-card-foreground">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isLogin ? "Sign in to your account" : "Sign up for a new account"}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!isLogin && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-card-foreground mb-1"
              >
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="name"
                  type="text"
                  className="pl-10 w-full px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                  {...register("name", { required: !isLogin })}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-card-foreground mb-1"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                id="email"
                type="email"
                className="pl-10 w-full px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-primary"
                placeholder="your@email.com"
                {...register("email", { required: "Email is required" })}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-card-foreground mb-1"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                id="password"
                type="password"
                className="pl-10 w-full px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
                {...register("password", { required: "Password is required" })}
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:underline"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
