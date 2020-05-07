class DeepWorkSession < ApplicationRecord
  belongs_to :user
  validates :user_id, presence: true
  validates :time_in_seconds, numericality: { only_integer: true, greater_than: 0}
end
