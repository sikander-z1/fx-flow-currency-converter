import { Route, Switch } from "wouter";
import BottomNav from "../BottomNav";

export default function BottomNavExample() {
  return (
    <div className="h-screen bg-background">
      <Switch>
        <Route path="/" component={() => <div className="p-8 text-center">Home Page</div>} />
        <Route path="/converter" component={() => <div className="p-8 text-center">Converter Page</div>} />
        <Route path="/favorites" component={() => <div className="p-8 text-center">Favorites Page</div>} />
        <Route path="/settings" component={() => <div className="p-8 text-center">Settings Page</div>} />
      </Switch>
      <BottomNav />
    </div>
  );
}
