FROM ruby:3.1.2
ARG APP_NAME=myapp-api
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
RUN mkdir ${APP_NAME}
WORKDIR ${APP_NAME}
COPY Gemfile ${APP_NAME}/Gemfile
COPY Gemfile.lock ${APP_NAME}/Gemfile.lock
RUN bundle update && bundle install
COPY . ${APP_NAME}

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
