RESTfull Suite Booking API
======================================
An example service which provides a RESTfull booking management API for a single suite.

It is written in Javascript for the Node.js runtime, & uses the Express web framework.
It uses in memory storage, so don't EVER let it fail!

Start it
----------
__The standard way__:
`npm start` OR `yarn start` will bring it up on your machine.
If you are already using port 8080, pass it a free port via the `SUITE_BOOKING_PORT` environment variable like so

__The docker-compose way__:
`docker-compose up` will bring it up via docker-compose. Standard docker compose commands will then be available `docker-compose logs` etc...


Run the tests
--------------
The tests are run via `jest`


Current Coverage Report
----------------------------

```
 PASS  __tests__/booking.test.js
 PASS  __tests__/api.test.js

-------------|---------|----------|---------|---------|-------------------
File         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------|---------|----------|---------|---------|-------------------
All files    |   86.79 |    84.61 |    92.3 |   86.53 |
 api.js      |   77.77 |       85 |   83.33 |   77.77 | 21-22,38-46
 bookings.js |   96.15 |    83.33 |     100 |      96 | 22
-------------|---------|----------|---------|---------|-------------------

Test Suites: 2 passed, 2 total
Tests:       5 skipped, 11 passed, 16 total
Snapshots:   0 total
Time:        2.013 s
```
