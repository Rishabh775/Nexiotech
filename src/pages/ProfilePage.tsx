import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/store";
import { User, Settings, LogOut, ShoppingBag } from "lucide-react";

const ProfilePage: React.FC = () => {
  const { user, logout } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to auth page if user is not logged in
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-card-foreground">
                {user.name}
              </h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-background p-4 rounded-lg">
              <div className="flex items-center space-x-2 text-card-foreground">
                <ShoppingBag className="h-5 w-5" />
                <span>Orders</span>
              </div>
              <p className="text-2xl font-bold mt-2">0</p>
            </div>

            {/* <div className="bg-background p-4 rounded-lg">
              <div className="flex items-center space-x-2 text-card-foreground">
                <Settings className="h-5 w-5" />
                <span>Role</span>
              </div>
              <p className="text-2xl font-bold mt-2 capitalize">{user.role}</p>
            </div> */}
          </div>

          {user.role === "admin" && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Admin Actions</h2>
              <button
                onClick={() => navigate("/admin")}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Go to Admin Dashboard
              </button>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
