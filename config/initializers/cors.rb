Rails.application.config.middleware.insert_before 0, Rack::Cors do
  # Dev
  allow do
    origins 'http://localhost:3000'

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head], 
        credentials: true
  end

  # Prod
  allow do
    origins 'https://deepworktracker.herokuapp.com/'

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head], 
        credentials: true
  end
end
