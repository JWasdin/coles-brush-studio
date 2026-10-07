# Cole’s Brush Studio

A simple studio site for natural nail care and hand-painted silks, based on the **Color Ritual** direction.

## Local

Open `index.html` in a browser, or from this folder:

```bash
python3 -m http.server 4173
```

Then visit [http://localhost:4173](http://localhost:4173).

## Tests

```bash
node --test tests/studio.test.js
```

## What’s here

- Homepage with two paths: painted silks (gallery + inquiry) and nail bookings
- Client-side booking request you can copy to send Cole
- Static deploy on Railway (`Staticfile` + `index.html`)
