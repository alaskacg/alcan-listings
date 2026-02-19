import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import MountainLogo from "@/components/MountainLogo";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const regions = [
  { name: "Fairbanks/North Star", href: "/regions", description: "Fairbanks and surrounding areas" },
  { name: "Delta Junction Area", href: "/regions", description: "Delta Junction and Big Delta" },
  { name: "Tok/Highway Corridor", href: "/regions", description: "Tok, Northway, and border area" },
  { name: "Denali Borough", href: "/regions", description: "Healy, Anderson, and Nenana" },
  { name: "Valdez-Cordova Border", href: "/regions", description: "Richardson Highway access" },
  { name: "Yukon-Tanana Region", href: "/regions", description: "Remote interior communities" },
];

const categories = [
  { name: "Vehicles", href: "https://kenaiautosales.com", description: "Cars, trucks, ATVs, snowmobiles" },
  { name: "Boats & Watercraft", href: "https://alaskanboats.com", description: "Fishing boats, kayaks, jet skis" },
  { name: "Homes for Sale", href: "https://kenaihomesales.com", description: "Residential properties" },
  { name: "Land for Sale", href: "https://kenailandsales.com", description: "Lots, acreage, wilderness" },
  { name: "Rentals", href: "https://kenaipeninsularentals.com", description: "Apartments, houses, cabins" },
  { name: "Mining Equipment", href: "https://alaskaminingequipment.com", description: "Gold mining, dredges, sluices" },
  { name: "Guide Services", href: "https://alaskaguidelistings.com", description: "Fishing, hunting, tours" },
  { name: "General Listings", href: "https://alaskadigs.com", description: "Everything else" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-glass">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <MountainLogo />
              <span className="font-display text-base font-bold text-foreground">Alcan Listings</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-4">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm bg-transparent">Regions</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2">
                        {regions.map((region) => (
                          <li key={region.name}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={region.href}
                                className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">{region.name}</div>
                                <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">
                                  {region.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                        <li className="col-span-2">
                          <Link
                            to="/regions"
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground text-center text-sm text-primary"
                          >
                            View All Regions →
                          </Link>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm bg-transparent">Categories</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-2 p-4 md:w-[600px] md:grid-cols-2 lg:grid-cols-3">
                        {categories.map((category) => (
                          <li key={category.name}>
                            <NavigationMenuLink asChild>
                              <a
                                href={category.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">{category.name}</div>
                                <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">
                                  {category.description}
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        ))}
                        <li className="col-span-full">
                          <Link
                            to="/categories"
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground text-center text-sm text-primary"
                          >
                            View All Categories →
                          </Link>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <Link to="/browse" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Browse All
              </Link>
              
              <ThemeToggle />

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/my-listings" className="cursor-pointer text-sm">My Listings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/post-listing" className="cursor-pointer text-sm">Post a Listing</Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to="/admin" className="cursor-pointer text-sm">Admin Dashboard</Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut} className="cursor-pointer text-destructive text-sm">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm">Sign In</Button>
                  </Link>
                  <Link to="/post-listing">
                    <Button variant="aurora" size="sm">
                      Post a Listing
                    </Button>
                  </Link>
                </div>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
                className="p-2 text-foreground"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border animate-slide-up max-h-[80vh] overflow-y-auto">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {/* Regions Accordion */}
            <details className="group">
              <summary className="flex items-center justify-between py-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                Regions
                <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="pl-4 py-2 space-y-2">
                {regions.map((region) => (
                  <Link
                    key={region.name}
                    to={region.href}
                    className="block text-sm text-muted-foreground hover:text-primary py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {region.name}
                  </Link>
                ))}
                <Link
                  to="/regions"
                  className="block text-sm text-primary py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  View All →
                </Link>
              </div>
            </details>

            {/* Categories Accordion */}
            <details className="group">
              <summary className="flex items-center justify-between py-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                Categories
                <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="pl-4 py-2 space-y-2">
                {categories.map((category) => (
                  <a
                    key={category.name}
                    href={category.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-muted-foreground hover:text-primary py-1"
                  >
                    {category.name}
                  </a>
                ))}
                <Link
                  to="/categories"
                  className="block text-sm text-primary py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  View All →
                </Link>
              </div>
            </details>

            <Link 
              to="/browse" 
              className="text-sm text-muted-foreground hover:text-foreground py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse All
            </Link>
            
            {user ? (
              <>
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="text-sm text-primary hover:text-primary/80 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Link to="/my-listings" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    My Listings
                  </Button>
                </Link>
                <Link to="/post-listing" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="aurora" size="sm" className="w-full mt-2">
                    Post a Listing
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="justify-start text-destructive mt-2"
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full">Sign In</Button>
                </Link>
                <Link to="/post-listing" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="aurora" size="sm" className="w-full">
                    Post a Listing
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
