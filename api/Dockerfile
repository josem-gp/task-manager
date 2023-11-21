FROM ruby:3.1.2 AS base

RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

WORKDIR /myapp-api

# Install gems
COPY Gemfile Gemfile.lock ./

FROM base AS development
ENV RAILS_ENV=development

RUN bundle config --global retry '5' \
  && bundle config --global jobs '4' \
  && bundle install

COPY . .

FROM base AS production

ENV RAILS_ENV=production

RUN bundle config set deployment 'true' \
  && bundle config set retry '5' \
  && bundle config set jobs '4' \
  && bundle config set without 'test development' \
  && bundle install

COPY . .

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
