# Aurelia Contact Manager Tutorial with Python bottle, Aurelia and Bulma

I got interested in the "MEAN" stack, (MongoDb, Express, Angular and NodeJs).

server:

I prefer to write my backend (server) in Python, because it can be pretty
close to the host OS, rather than Express which has to push everything through
NodeJs supported operations.  I settled on "bottle" for a webserver, and
"bottle-mongo" and PyMongo, for querying the data.

client:

I was frustrated with all the changes going on in Angular.  The newest version,
which requires Typescript seemed to break every few days due to some changes.
I switched to Aurelia, which seems to be more basic and supports several
different languages and have most of what I need.

ui:

I was looking at Material Design frameworks for a while, but found I needed
something more lightweight.  I settled on Bulma, which is CSS-only, so no
need for some Javascript library rewriting all my docs.

api:

I'm just trying out some API definition languages like Swagger, API Blueprints,
WSDL and OpenAPI.

I'm also getting into using two JetBrains IDE's at the same time on my
projects.  I create my PyCharm project in ~/dvl/pycharm/cm, my WebStorm project
in ~/dvl/webstorm/cm, then put all my source code into ~/git/cm, using
directory structure to point to the same location.

This should give me the ability to push my code to github and also manage
deployments to AWS, Google Cloud, or Heroku.

The original example came from Aurelia's "Contact Manager" tutorial, but I
followed the "next steps" to create a real backend sever with my API calls.

I hope to use this as a model for real web applications I want to write.
