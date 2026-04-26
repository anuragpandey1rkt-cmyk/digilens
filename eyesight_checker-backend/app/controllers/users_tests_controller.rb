class UsersTestsController < ApplicationController

    before_action :set_users_test, only: [:show, :edit, :update, :destroy]

    def index
        @users_tests = UsersTest.all
        render json: @users_tests, status: 200
    end

    def show
        render json: @users_test, status: 200
    end

    def new
        @users_test = UsersTest.new
    end

    def create
    # byebug
        @users_test = UsersTest.new(users_test_params)
        if @users_test.save
            render json: @users_test, status: :created, location: @users_test
        else
            render json: @users_test.errors, status: :unprocessable_entry
        end
    end

    def edit
    end

    def update
        if @users_test.update(users_test_params)
            render json: @users_test, status: 200
        else 
            render json: @users_test.errors, status: :unprocessable_entry
        end
    end

    def destroy
        @users_test.delete
        render json: {usersTestId: @users_test.id}
    end

    private

    def set_users_test
        @users_test = UsersTest.find(params[:id])
    end

    def users_test_params
        params.require(:users_test).permit(:test_name, :test_result, :user_id, :users_name)
    end

end