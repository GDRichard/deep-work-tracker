Rails.application.routes.draw do
  namespace 'api' do
    post '/register', to: 'users#create'

    delete '/logout', to: 'sessions#logout'
    post '/login', to: 'sessions#login'
    get '/logged_in_status', to: 'sessions#is_logged_in?'

    resources :deep_work_sessions, only: [:index, :create]
  end
end
