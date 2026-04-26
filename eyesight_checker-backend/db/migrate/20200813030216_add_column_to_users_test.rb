class AddColumnToUsersTest < ActiveRecord::Migration[6.0]
  def change
    add_column :users_tests, :users_name, :string
  end
end
