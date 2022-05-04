#include <cstdlib>
#include <iostream>
#include <string>

class user {
	  public:
	  	user();
		void set(std::string Name, std::string Email, std::string Password, std::string Genre, std::string Orientation,std::string  Description, std::string Age, float LocationX, float LocationY, std::string Tags,std::string Image, std::string  Likeds, std::string RecentProfile, std::string RecentVisit)
		{
			  name = Name;
			  email = Email;
			  password = Password;
			  genre = Genre;
			  orientation = Orientation;
			  description = Description;
			  age = Age;
			  locationX = LocationX;
			  locationY = LocationY;
			  tags = Tags;
			  image = Image;
			  likeds = Likeds;
			  recentProfile = RecentProfile;
			  recentVisit = RecentVisit;
		}
		void displayInsert()
		{
			std::cout << "INSERT INTO users (name, email, password, genre, orientation, description, age, locationX, locationY, tags, image, likeds, recentProfile, recentVisit) VALUES ('" << name << "','" << email << "','" << password << "','" << genre << "','" << orientation << "','" << description << "','" << age << "','" << locationX << "','" << locationY << "','" << tags << "','" << image << "','" << likeds << "','" << recentProfile << "','" << recentVisit << "');" << std::endl;
		}
		private:
			std::string name;
			std::string email;
			std::string password;
			std::string genre;
			std::string orientation;
			std::string description;
			std::string age;
			float locationX;
			float locationY;
			std::string tags;
			std::string image;
			std::string likeds;
			std::string recentProfile;
			std::string recentVisit;
};
