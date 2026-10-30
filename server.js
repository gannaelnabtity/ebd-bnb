import express from "express";

const app = express();
app.use(express.json());

// Log every request, then pass it on 
app.use((req, res, next) => {
    console.log(req.method, req.url); 
next();
});

// Read JSON request bodies into req.body app.use(express.json());


// Listings data
let listings = [
{ id: 1, title: "Nile View Apartment", pricePerNight: 85 },
{ id: 2, title: "Beach House", pricePerNight: 140 },
{ id: 3, title: "Desert Eco-Lodge", pricePerNight: 60 },
];

let nextId = 4;

// Get all listings
function getAllListings() {
return listings;
}

// Get listing by ID
function getListingById(id) {
return listings.find((listing) => listing.id === id);
}

// Add a new listing
function addListing(data) {
const listing = {
id: nextId++,
title: data.title,
pricePerNight: data.pricePerNight,
};

```
listings.push(listing);
return listing;
```

}

// Update a listing
function updateListing(id, data) {
const listing = getListingById(id);

```
if (listing) {
    listing.title = data.title;
    listing.pricePerNight = data.pricePerNight;
}

return listing;
```

}

// Remove a listing
function removeListing(id) {
const listing = getListingById(id);

```
if (listing) {
    listings = listings.filter((item) => item.id !== id);
}

return listing;
```

}

// GET all listings
function handleGetAll(req, res) {
res.json(getAllListings());
}

// GET one listing
function handleGetOne(req, res) {
const id = Number(req.params.id);
const listing = getListingById(id);

```
if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
}

res.json(listing);
```

}

// POST - Create listing
function handleCreate(req, res) {
const listing = addListing(req.body);
res.status(201).json(listing);
}

// PUT - Update listing
function handleUpdate(req, res) {
const id = Number(req.params.id);
const listing = updateListing(id, req.body);

```
if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
}

res.json(listing);
```

}

// DELETE - Remove listing
function handleDelete(req, res) {
const id = Number(req.params.id);
const listing = removeListing(id);

```
if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
}

res.json({ message: "Listing deleted successfully", listing });
```

}

// Routes
app.get("/", (req, res) => {
res.send("Welcome to ebd bnb");
});

app.get("/api/listings", handleGetAll);
app.get("/api/listings/:id", handleGetOne);
app.post("/api/listings", handleCreate);
app.put("/api/listings/:id", handleUpdate);
app.delete("/api/listings/:id", handleDelete);

// Start server
app.listen(3000, () => {
console.log("Server running on http://localhost:3000");
});
