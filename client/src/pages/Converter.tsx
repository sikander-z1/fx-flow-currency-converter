import { useState } from "react";
import { ArrowRightLeft, Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useToast } from "@/hooks/use-toast";
import LoadingShimmer from "@/components/LoadingShimmer";

export default function Converter() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState("1");
  const [result, setResult] = useState<number | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [currenciesLoaded, setCurrenciesLoaded] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const { addFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();

  const loadCurrencies = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
      const data = await response.json();
      const currencyList = Object.keys(data.rates).sort();
      setCurrencies(currencyList);
      setCurrenciesLoaded(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load currencies. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConvert = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Amount",
        description: "Please enter a valid amount greater than 0.",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const data = await response.json();
      const exchangeRate = data.rates[toCurrency];
      const convertedAmount = parseFloat(amount) * exchangeRate;
      
      setRate(exchangeRate);
      setResult(convertedAmount);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Conversion Failed",
        description: "Unable to fetch exchange rates. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveFavorite = () => {
    if (rate === null) {
      toast({
        title: "Convert First",
        description: "Please convert currencies before saving to favorites.",
      });
      return;
    }

    if (isFavorite(fromCurrency, toCurrency)) {
      toast({
        title: "Already Saved",
        description: "This currency pair is already in your favorites.",
      });
      return;
    }

    addFavorite({
      fromCurrency,
      toCurrency,
      rate,
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 500);

    toast({
      title: "Saved to Favorites",
      description: `${fromCurrency} → ${toCurrency} has been added to your favorites.`,
    });
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
    setRate(null);
  };

  if (!currenciesLoaded && !loading) {
    loadCurrencies();
  }

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-2 animate-slide-up">
          <h1 className="text-3xl md:text-4xl font-bold">Currency Converter</h1>
          <p className="text-muted-foreground">
            Convert between world currencies with live exchange rates
          </p>
        </div>

        {loading && !result ? (
          <LoadingShimmer />
        ) : (
          <Card className="p-6 md:p-8 space-y-6 animate-slide-up">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="from-currency">From Currency</Label>
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger
                    id="from-currency"
                    data-testid="select-from-currency"
                    className="h-14 text-base rounded-xl"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency} value={currency}>
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={swapCurrencies}
                  data-testid="button-swap-currencies"
                  className="rounded-full hover-elevate"
                >
                  <ArrowRightLeft className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="to-currency">To Currency</Label>
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger
                    id="to-currency"
                    data-testid="select-to-currency"
                    className="h-14 text-base rounded-xl"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency} value={currency}>
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  data-testid="input-amount"
                  className="h-14 text-base rounded-xl"
                />
              </div>
            </div>

            <Button
              onClick={handleConvert}
              disabled={loading}
              data-testid="button-convert"
              className="w-full h-14 text-base rounded-xl"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Converting...
                </>
              ) : (
                <>
                  <ArrowRightLeft className="w-5 h-5 mr-2" />
                  Convert
                </>
              )}
            </Button>
          </Card>
        )}

        {result !== null && rate !== null && (
          <Card className="p-8 space-y-6 rounded-3xl bg-gradient-to-br from-card to-card/50 shadow-xl animate-slide-up">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Converted Amount</p>
              <p className="text-5xl md:text-6xl font-bold" data-testid="text-result">
                {result.toFixed(2)}
              </p>
              <p className="text-lg font-medium text-muted-foreground">{toCurrency}</p>
            </div>

            <div className="text-center text-sm text-muted-foreground border-t pt-4">
              1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
            </div>

            <Button
              variant="outline"
              onClick={handleSaveFavorite}
              disabled={isFavorite(fromCurrency, toCurrency)}
              data-testid="button-save-favorite"
              className={`w-full h-14 text-base rounded-xl hover-elevate ${
                saveSuccess ? "animate-pulse-success" : ""
              }`}
            >
              <Heart
                className={`w-5 h-5 mr-2 ${
                  isFavorite(fromCurrency, toCurrency) ? "fill-current text-destructive" : ""
                }`}
              />
              {isFavorite(fromCurrency, toCurrency) ? "Already in Favorites" : "Save to Favorites"}
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
