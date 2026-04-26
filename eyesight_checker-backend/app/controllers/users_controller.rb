class UsersController < ApplicationController

    before_action :set_user, only: [:show, :edit, :update, :destroy]

    def index
        @users = User.all
        render json: @users, status: 200
    end

    def show
        render json: @user, status: 200
    end

    def new
        @user = User.new
    end

    def create
        # byebug
        @user = User.new(user_params)
        if @user.save
            render json: @user, status: :created, location: @user
        else
            render json: @user.errors, status: :unprocessable_entry
        end
    end

    def edit
    end
    
    def update
        if @user.update(user_params)
            render json: @user, status: 200
        else 
            render json: @user.errors, status: :unprocessable_entry
        end
        render json: @user, status: 200
    end

    def destroy
        @user.delete
        render json: {userId: @user.id}
    end

    private

    def set_user
        @user = User.find(params[:id])
    end


    def user_params
        params.require(:user).permit(:name, :email)
    end
    
end