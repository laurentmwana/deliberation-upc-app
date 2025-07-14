import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { SelectSingle } from "./select-single";
import { SelectMultiple } from "./select-multiple";

type Option = { label: string; value: string };

type AdditionalFilter = {
  type: "single" | "multiple";
  options: Option[];
  isPending?: boolean;
};

type FilterInputProps = {
  url: string;
  defaultSort?: string | string[];
  additionalFilters?: Record<string, AdditionalFilter>;
  availableSorts: Option[];
};

export function FilterInput({
  url,
  defaultSort = "created_at",
  additionalFilters = {},
  availableSorts,
}: FilterInputProps) {
  const { get, processing } = useForm();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

    const getDefaultSortField = useCallback(() => {
    if (Array.isArray(defaultSort)) {
      return defaultSort.length > 0 ? defaultSort[0].replace(/^-/, "") : "created_at";
    }
    return typeof defaultSort === "string" ? defaultSort.replace(/^-/, "") : "created_at";
  }, [defaultSort]);

  const [sortField, setSortField] = useState<string>(getDefaultSortField());
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const areFiltersEqual = useCallback(
    (a: Record<string, string[]>, b: Record<string, string[]>) => {
      const aKeys = Object.keys(a);
      const bKeys = Object.keys(b);
      if (aKeys.length !== bKeys.length) return false;
      
      return aKeys.every(key => {
        if (!b[key] || a[key].length !== b[key].length) return false;
        const aSorted = [...a[key]].sort();
        const bSorted = [...b[key]].sort();
        return aSorted.every((val, i) => val === bSorted[i]);
      });
    },
    []
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // Update search
    const q = params.get("q") || "";
    if (q !== search) setSearch(q);

    // Update sort
    const sort = params.get("sort") || "";
    let newOrder: "asc" | "desc" = "asc";
    let newSortField = getDefaultSortField();
    
    if (sort) {
      const firstSort = sort.split(",")[0];
      newOrder = firstSort.startsWith("-") ? "desc" : "asc";
      newSortField = firstSort.replace(/^-/, "");
    }

    setOrder(newOrder);
    setSortField(newSortField);

    // Update filters
    const newSelectedFilters: Record<string, string[]> = {};
    params.forEach((value, key) => {
      const match = key.match(/^filter\[(.+?)](?:\[\])?$/);
      if (match) {
        const filterKey = match[1];
        newSelectedFilters[filterKey] = [...(newSelectedFilters[filterKey] || []), value];
      }
    });

    if (!areFiltersEqual(newSelectedFilters, selectedFilters)) {
      setSelectedFilters(newSelectedFilters);
    }
  }, [areFiltersEqual, getDefaultSortField, selectedFilters]);

  const activeFiltersCount = Object.values(selectedFilters).reduce(
    (acc, arr) => acc + arr.length, 
    search.trim() ? 1 : 0
  );

  const handleFilterChange = useCallback((key: string, values: string[]) => {
    setSelectedFilters(prev => ({ ...prev, [key]: values }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (search.trim()) params.set("q", search.trim());
    params.set("sort", `${order === "desc" ? "-" : ""}${sortField}`);

    Object.entries(selectedFilters).forEach(([key, values]) => {
      values.forEach(val => params.append(`filter[${key}][]`, val));
    });

    get(`${url}?${params.toString()}`, {
      onSuccess: () => setOpen(false),
      preserveState: true,
    });
  }, [search, order, sortField, selectedFilters, get, url]);

  const handleReset = useCallback(() => {
    setSearch("");
    setSelectedFilters({});
    setOrder("asc");
    setSortField(getDefaultSortField());
    get(url, { preserveState: true });
    setOpen(false);
  }, [get, url, getDefaultSortField]);

  const toggleOrder = useCallback(() => {
    setOrder(prev => (prev === "asc" ? "desc" : "asc"));
  }, []);

  return (
    <>
      <Button 
        variant="outline" 
        onClick={() => setOpen(true)} 
        className="relative"
        aria-label="Ouvrir les filtres"
      >
        <span className="hidden md:inline">Filtrer</span>
        <Filter className="md:ml-2" size={15} />
        {activeFiltersCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-white">
            {activeFiltersCount}
          </span>
        )}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85vh] w-[90vw] max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Filtres</DialogTitle>
            <DialogDescription>
              Personnalisez les filtres selon vos besoins
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Search Input */}
              <div className="space-y-2">
                <Label htmlFor="search">Recherche</Label>
                <Input
                  id="search"
                  placeholder="Rechercher..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  disabled={processing}
                />
              </div>

              {/* Additional Filters */}
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(additionalFilters).map(([key, filter]) => (
                  <div key={key} className="space-y-2">
                    <Label>{key}</Label>
                    {filter.isPending ? (
                      <p className="text-sm text-muted-foreground">Chargement...</p>
                    ) : filter.type === "multiple" ? (
                      <SelectMultiple
                        options={filter.options}
                        values={selectedFilters[key] || []}
                        onChange={(values) => handleFilterChange(key, values)}
                      />
                    ) : (
                      <SelectSingle
                        options={filter.options}
                        value={selectedFilters[key]?.[0] || ""}
                        onChange={(value) => handleFilterChange(key, value ? [value] : [])}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Sorting */}
              <div className="flex items-end gap-4">
                <div className="flex-1 space-y-2">
                  <Label>Tri par</Label>
                  <SelectSingle
                    options={availableSorts}
                    value={sortField}
                    onChange={setSortField}
                    disabled={processing}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={toggleOrder}
                  disabled={processing}
                  className="h-10"
                >
                  {order === "asc" ? "Croissant" : "Décroissant"}
                </Button>
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                disabled={processing}
              >
                Réinitialiser
              </Button>
              <div className="flex gap-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline" disabled={processing}>
                    Annuler
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={processing}>
                  {processing ? "Application..." : "Appliquer"}
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}