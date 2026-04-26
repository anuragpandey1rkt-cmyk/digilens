class CreateUsersTests < ActiveRecord::Migration[6.0]
  def change
    create_table :users_tests do |t|
      t.string :test_name
      t.integer :test_result
      t.belongs_to :user

      t.timestamps
    end
  end
end
