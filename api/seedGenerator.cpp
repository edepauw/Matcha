#include <cstdlib>
#include <iostream>
#include <string>
#include <vector>
#include <map>


class user {
	  public:
		std::string username;
		std::string firstname;
		std::string lastname;
		std::string email;
		//username lastname firstname email password orientationId bio dms age locationX locationY tags image score meLikeUsers userLikesMe searchAge searchKms matchs
		std::string password;
		int orientationId;
		std::string bio;
		std::string age;
		float locationX;
		float locationY;
		std::vector<std::string> Matchs;
		std::vector<std::string> meLikeUsers;
		std::vector<std::string> userLikesMe;
		std::string MatchsJson;
		std::string TagsJson;
		std::string image;
		std::string meLikeUsersJson;
		std::string userLikesMeJson;
		int sizeTags;
		int score;
		int sizeLiked;
		int sizeLikes;
};
int findbyName(user *users, std::string name)
{
	for (int i = 0; i < 1000; i++)
	{
		if (users[i].username == name)
		{
			return i;
		}
	}
	return -1;
}
int randomInt(int min, int max) {
	return min + (rand() % (max - min + 1));
}
float randomFloat(float min, float max) {
	float random = ((float) rand()) / (float) RAND_MAX;
	float diff = max - min;
	float r = random * diff;
	return min + r;
}
bool isPossible(user one, user two){
	char MatchMap[21][22] = {	"100101100000000000000",
								"000000010010110000000",
								"000000000000001001011",
								"100101110010110000000",
								"000000010010111001011",
								"100101100000001001011",
								"100101110010111001011",
								"010110100000000000000",
								"000000001011010000000",
								"000000000000000101101",
								"010110101011010000000",
								"000000001011010101101",
								"010110100000000101101",
								"010110101011010101101",
								"001011100000000000000",
								"000000000101110000000",
								"000000000000000010111",
								"001011100101110000000",
								"000000000101110010111",
								"001011100000000010111",
								"001011100101110010111"
							};

	// std::cout << inttwo << " "<< intone << " " << (MatchMap[intone][inttwo] == '1' )<< std::endl;
	return MatchMap[one.orientationId][two.orientationId] == '1';
	//`id` INT NOT NULL AUTO_INCREMENT,\

}

int main(void)
{
	user users[1000];
	std::string genre[2] = {"Homme", "Femme"};
	std::string orientation[4] = {"Hetero", "Lesbian", "Gay", "Bi"};
	std::string names[1000] = {"Charlotte","Evelyn","Scarlett","Chloe","Zoe","Austin","Claire","Beau","Serenity","Chase","Cole","Max","Calvin","Remi","Taylor","Leon","Victor","Valerie","Genevieve","Magnolia","Remy","Rosalie","Noelle","Elise","Louis","Margot","Andre","Joanna","Daxton","Camille","Paige","Lucille","Delaney","Lyric","Travis","Giselle","Michelle","Demi","Colson","Destiny","Gabrielle","Dior","Marshall","Noel","Lainey","Russell","Denver","Tyson","Cade","Paris","Madeleine","Esme","Porter","Chandler","Harvey","Hugo","Jacqueline","Scarlet","Danielle","Maci","Bellamy","Celine","Liana","Jolene","Quincy","Forrest","Matilda","Dax","Gage","Tripp","Bruce","Elaine","Colette","Macie","Raphael","Cannon","Mallory","Case","Bonnie","Clementine","Julie","Macy","Marie","Dariel","Laney","Faye","Louise","Elodie","Eileen","Scout","Chanel","Lacey","Jolie","Roselyn","Joelle","Marcel","Curtis","Margo","Rosalee","Scarlette","Mavis","Lance","Denisse","Ila","Valentin","Simone","Denise","Marlowe","Forest","Jon","Blaise","Corinne","Jewel","Violette","Dominique","Belle","Wallace","Dion","Renee","Leroy","Rene","Adrienne","Channing","Lianna","Desiree","Dixie","DArcy","Montgomery","Jules","Courtney","Lyle","Darcy","Kamille","Soleil","Jean","Granger","Marc","Lucien","Taylin","Pierre","Annette","Terrell","Amor","Marian","Marquis","Gilbert","Gisselle","Chevy","Marion","Lucie","Gilberto","Ansel","Teddy","Lorraine","Margaux","Macey","Geneva","Bernadette","Darrell","Bernard","Nadine","Odette","Elinor","Lottie","Destin","Toni","Jolee","Tracy","Antoine","Maribel","Nicolette","Eamon","Lori","Esmae","Delanie","Marin","Yvonne","Jacquelyn","Abrielle","Yvette","Denis","Arlet","Destinee","Canon","Anabelle","Avril","Orson","Lou","Desire","Cosette","Jarvis","Noella","Marquise","Henri","Royale","Zelie","Millicent","Ranger","Dashiell","Tyce","Brice","Daryl","Evalina","Ames","Jacklyn","Lynn","Cordell","Marianne","Chace","Remmy","Lyrica","Ivette","Fitz","Delani","Vernon","Darell","Pryce","Leana","Amour","Tayla","Percy","Amore","Lourdes","Josette","Antwan","Desirae","Mael","Emile","Burke","Marguerite","Evelin","Gigi","Vermont","Ignace","Lacy","Lacie","Jenevieve","Jaqueline","Aveline","Jacques","Antoinette","Abella","Normandie","Marquez","Laramie","Laci","Jeanette","Aud","Banner","Joella","Francine","Nature","Stefany","Mallorie","Collette","Sebastien","Corban","Chayce","Joie","Ansell","Bass","Mignonette","Morell","Beldon","Myrline","Medard","Price","Vianna","Ismay","Reynaud","Berger","Manville","Kanon","Gabby","Vernen","Chany","Marcell","Lealia","Chancellor","Loucille","Brigitte","Cloy","Monty","Myrleen","Lucyle","Quincey","Beale","Therese","Pauline","Evline","Coralie","Laurentina","Lyon","Auda","Bernyce","Noelene","Burnet","Leontina","Granvill","Rudolphe","Arjean","Rives","Armande","Malorie","Leiana","Luc","Barber","Lowel","Aramis","Ivetta","Monique","Emmanuelle","Avarie","Florent","Manie","Florenz","Bertrice","Brucie","Verney","Madoline","Kaarlo","Maragaret","Varden","Kurtis","Alain","Macon","Avenell","Royalene","Villard","Bayless","Sachie","Evette","Algy","Acadia","Roel","Beal","Harcourt","Percival","Dumas","Alsace","Marjolaine","Bedell","Platt","Bernet","Margeree","Verdun","Destini","Adelaid","Baylen","Chayse","Burle","Corina","Rozellia","Claude","Kayde","DArtagnan","Taylyn","Henny","Gala","Esmee","Tayler","Garlyn","Jenett","Suzanne","Orvell","Sherry","Marietta","Delphine","Delany","Alysson","Belmont","Forster","Vallee","Delano","Bray","Grenville","Jeanne","Chanelle","Ermine","Margherite","Romayne","Renae","Joleigh","Brunell","Nann","Reney","July","Remie","Lenoir","Delainey","Mignonne","Lowell","Hewlett","Brier","Jenavieve","Carville","Gaylor","Maryon","Roul","Marciano","Cornell","Clair","Norvil","Pierette","Ivelisse","Helene","Chic","Huguette","Levant","Voncile","Talen","Sacha","Gae","Rochelle","Argene","Guilbert","Sheriel","Gai","Gib","Narcissus","DeLaina","Barrette","Granvil","Murle","Myrle","Vertie","Didier","Arnet","Corben","Chasen","Armand","Nohemi","Sherette","Garlen","Esmay","Allura","Valette","Seeley","Cherye","Coetta","Vachel","Frederic","Janyne","Fay","Pascal","Merle","Steph","Gillette","Verdon","Annabell","Macee","Claudelle","Jaculine","Bunyan","Charilyn","Coleta","Dinnie","Sherrylyn","Nevil","Merla","Sherol","Darrill","Gaige","Peer","Bernett","Cherrilyn","Jewelene","Lucienne","Chantel","Gaye","Cheval","Derril","Marshal","Monet","Ivonne","Fae","Evelyne","Jaklyn","Russel","Cheresse","Dorreen","Garlin","Harve","Timolin","Margeaux","Joleen","Norval","Cheryl","Chantaye","Suzette","Allure","Garlan","Maxime","Dre","Belden","Belvia","Octave","Genevie","Charyn","Fayetta","Bellamie","Kourtnie","Lovell","Fawne","Cannan","Beaumont","Nicoletta","Maryan","Chereese","Joely","Esma","Corbie","Tycen","Thierry","Bellina","Chantez","Lieselotte","Norville","Elois","Etienne","Clemente","Denyse","Reason","Orlena","Jaquelin","Chantelle","Beige","Cherrice","Morty","Myrlene","Orlene","Darald","Morry","Deney","Bodin","Verle","Vanity","Cabe","Ivonna","Malloree","Purcell","Maryanna","Ariane","Adelie","Diella","Mallery","Parrish","Sherylyn","Telford","Blondell","Shantal","Hilaire","Chantea","Courteney","Genavieve","Amorette","Delene","Berke","Beaufort","Cherylin","Reneisha","Cheryllyn","Marqui","DeLayna","Leroi","Merlina","Eyvonne","Jacquenette","Jodell","Jeanetta","Tallan","Ardelle","Bernedette","Demarkus","Darrel","Talin","Satin","Gay","Corby","Marien","Travers","Jacklin","Darroll","Cerisa","Dumont","Helmut","Chandal","Kurtiss","Chontel","Corteney","Rodell","Sharay","Neville","Shantella","Cherece","Coley","Jean-Michel","Courtnay","Cerissa","Ville","Ysabel","Cabot","Claudine","Danton","Jacalyn","Laicee","Sheree","Vern","Jackelyn","Chere","Jacqueleen","Maicy","Chantal","Jaclin","Sherelle","Cortny","Chaunta","Dupre","Fontane","Hardie","Lisle","Cortnee","Denyce","Ramel","Norris","Darry","Jaques","Markise","Leeroy","Babette","Joelliane","Chantiel","Cheryse","Cloyce","Vernee","Dartagnan","Capucine","Rawlins","Chantrell","Purvis","Cherin","Sharilynn","Alsatia","Jacquelle","Catiana","Geneve","Chereen","Cherene","Cheriese","Faun","Margi","Curtice","Fawnia","Melville","Barbar","Ottilie","Merline","Cherina","Sherrelle","Shereece","Sherrica","Jacquelin","Marcelin","Burgess","Cardell","Jacalynn","Zay","Richmond","Franchot","Jodelle","Philippe","Liann","Morrell","Hewitt","Gislaine","Shonta","Deryl","Gaston","Garen","Cezanne","Chantay","Cherese","Shantalle","Sheria","Lorrayne","Travys","Burgandy","Sherese","Tremont","Elroi","Chantry","Chayne","Forester","Maicey","Mandolin","Renay","Jaimie","Crescentia","Merl","Jacquelina","Derrel","Shawnta","Mimi","Bevis","Renat","Shanda","Shenelle","Chantae","Courtnie","Maryetta","Mignon","Nicollette","Shannelle","Pleasant","Lucila","Julienne","Jewell","Jacquelynn","Chaunte","Jacqualyn","Destiney","Dennise","Shaunta","Arnett","Cabell","Colbert","Norvell","Sennett","Shareese","Dennette","Leontyne","Lysle","Margurite","Chantey","Marquess","Shauntell","Chauntell","Shuree","Carressa","Chauntay","Saber","Russ","Cortne","Sheresa","Matthieu","Derrill","Chantrel","Chantrelle","Elroy","Jacqualine","Laicey","Sherice","Chanele","Ive","Beauregard","Armond","Chantele","Drury","Terrall","Coty","Sinclair","Marquisa","Noeliz","Perrie","Chalmer","Chantill","Cherree","Courteny","Norvel","Mallorey","Maude","Cherisse","Cortnie","Delron","Jacquelynne","Marquiz","Burrell","Chantasia","Genevia","Mystica","Renaud","Sherissa","Abrial","Algernon","Channelle","Chenelle","Cherilyn","Cheyne","Destina","Jacqlyn","Jaquelynn","Jerrard","Olisa","Darryll","Fawn","Courtlyn","Caprice","Flori","Harvy","Helaine","Jacqui","Nadene","Terryl","Chane","Cheree","Delancy","Duvall","Hervey","Jewelle","Labron","Rosalyne","Berenger","Cherrise","Derrall","March","Traviss","Vere","Cherrie","DOr","Duval","Nadina","Nadyne","Pierina","Renell","Rodel","Martinique","Marshell","Aundray","Cap","Capp","Jewelisa","Jordane","Nannette","Noele","Sharice","Cordelle","Darcel","Nowell","Antwaine","Caresse","Chalmers","Sherrilyn","Ysabell","Garland","Derrell","Corbett","Charee","Dixee","Jacklynne","Tahlor","Chantilly","Demie","Jackqueline","Jully","Lurdes","Marquisha","Shontelle","Traver","Chantil","Fleurette","Shandelle","Shereena","Shontal","Umber","Shanell","Chandel","Marquesa","Algie","Chantle","Chantra","Chonda","Delrick","MAnvel","Orvil","Shery","Mireille","Cherena","Cheresa","Chery","Cheryce","Drewry","Gibb","Quennel","Verne","Chantrice","Darral","Cherisa","Padgett","Aude","Deforrest","Jacquette","Burnett","Loraine","Annique","Cordney","Courtny","Deniece","Jacquel","Lonell","Romane","Delane","Chantai","Chantille","Cheralyn","Collete","Desiri","Fontana","Sharalyn","Chantee","Cherita","Gaylord","Jewelyn","Sherece","Chanell","Almando","Jacolyn","Jacquella","Chandelle","Chantalle","Chardonay","Jacquetta","Quennell","Sharisa","Tempestt","Taft","Antwoin","Dacio","Denize","Evo","Lorain","Lowe","Malorey","Marjori","Markiss","Shary","Vernard","Darcell","Ostin","Caress","Chantella","Chauntelle","Joela","Joellyn","Lovel","Mistique","Shiree","Carvel","Cerria","Cherice","Cherrelle","Fawna","Laciann","Maslin","Yvon","Channell","Marquessa","Shaunda","Shereese","Lebron","Arnaud","Chevalier","Eyvette","Jackalin","Markess","Iven","Chaunce","Darrol","Denissa","Vernal","Courtenay","Del","Antwone","Antione","Shawnda","Shonda","Renne","Cortney","Shanel","Chanta","Chauntel","Denese","Chantall","Durelle","Sherise","Fontaine","Jacki","Jennavieve","Larue","Roi","Francois","Andrae","Parish","Tempest","Shantel","Remee","Linette","Harvie","Demiana","Chaney", "eliott"};
	std::string tags[14] = { "food", "vegan", "dog", "cat", "summer", "winter", "day", "night", "sport", "art", "geek", "charo", "savage", "glamourous"};
	std::string  image[2] = {"http://localhost:667/uploads/edepauw0.jpg", "http://localhost:667/uploads/edepauw1.jpg"};
	std::string  description[5] = {"This is a description", "This is another description", "This is a third description", "This is a fourth description", "This is a fifth description"};
	for (int i = 0; i < 1000 ; i++)
	{
		users[i].username = names[i];
		users[i].firstname = names[i] ;
		users[i].lastname = names[i] ;
		users[i].email = names[i] + "@gmail.com";
		users[i].password = names[i] + "passwd";
		users[i].orientationId = randomInt(0, 20);
		users[i].score = randomInt(0, 100);
	}
	for (int i = 0; i < 1000 ; i++)
	{
		users[i].bio = description[randomInt(0,4)];
		users[i].age = std::to_string(randomInt(18, 50));
		users[i].locationX = randomFloat(0, 5.5);
		users[i].locationY = randomFloat(44, 47);
		users[i].sizeTags = randomInt(3, 7);
		users[i].image = image[randomInt(0, 1)];
		std::string userTags[users[i].sizeTags];
		for (int j = 0; j < users[i].sizeTags; j++)
			userTags[j] = tags[randomInt(0, 13)];
		//check userTags doublon
		for (int j = 0; j < users[i].sizeTags; j++)
		{
			for (int k = 0; k < j; k++)
			{
				if (userTags[j] == userTags[k])
				{
					userTags[j] = tags[randomInt(0, 13)];
					j = 0;
				}
			}
		}
		users[i].TagsJson = "[";
		for (int j = 0; j < users[i].sizeTags; j++)
		{
			if (j != users[i].sizeTags - 1)
				users[i].TagsJson += "\"" + userTags[j] + "\"" + ",";
			else
				users[i].TagsJson += "\"" + userTags[j] + "\"";
		}
		users[i].TagsJson += "]";
		int size = randomInt(10, 20);
		for (int j = 0; j < size; j++){
			int newer = randomInt(0, 999);
			if (isPossible(users[i], users[findbyName(users, names[newer])]) && std::find(users[i].meLikeUsers.begin(), users[i].meLikeUsers.end(), names[newer]) == users[i].meLikeUsers.end() )
			{

				users[i].meLikeUsers.push_back(names[newer]);
				users[findbyName(users, names[newer])].userLikesMe.push_back(users[i].username);
			}
		}

		//jsonify userLikedUsers
	}
	for (int i = 0; i < 1000; i++)
	{
		//amis en retour pour creer plus de match au moins 1 par personne
		int size = randomInt(1, 2);

		for (std::vector<std::string>::iterator itu = users[i].userLikesMe.begin(); size >= 0 && itu != users[i].userLikesMe.end(); itu++)
		{
			if(std::find(users[i].meLikeUsers.begin(), users[i].meLikeUsers.end(), *itu) == users[i].meLikeUsers.end())
			{
				users[i].meLikeUsers.push_back(*itu);
				users[findbyName(users, *itu)].userLikesMe.push_back(users[i].username);
			}
			size--;
		}
		users[i].meLikeUsersJson = "[";
		for (std::vector<std::string>::iterator it = users[i].meLikeUsers.begin() ; it != users[i].meLikeUsers.end(); it++)
		{
			if (it != (users[i].meLikeUsers.end() - 1))
				users[i].meLikeUsersJson += "\"" + *it + "\"" + ",";
			else
				users[i].meLikeUsersJson += "\"" + *it + "\"";
		}
		users[i].meLikeUsersJson += "]";
		users[i].userLikesMeJson = "[";
		for (std::vector<std::string>::iterator it = users[i].userLikesMe.begin() ; it != users[i].userLikesMe.end(); it++)
		{
			if (it != (users[i].userLikesMe.end() - 1))
				users[i].userLikesMeJson += "\"" + *it + "\"" + ",";
			else
				users[i].userLikesMeJson += "\"" + *it + "\"";
		}
		users[i].userLikesMeJson += "]";
		for (std::vector<std::string>::iterator itj = users[i].meLikeUsers.begin() ; itj != users[i].meLikeUsers.end(); itj++)
		{
			if(std::find(users[i].userLikesMe.begin(), users[i].userLikesMe.end(), *itj) != users[i].userLikesMe.end())
				users[i].Matchs.push_back(*itj);
		}
		//jsonify users[i].userMatchs
		users[i].MatchsJson = "[";
		for (std::vector<std::string>::iterator it = users[i].Matchs.begin() ; it != users[i].Matchs.end(); it++)
		{
			if (it != (users[i].Matchs.end() - 1))
				users[i].MatchsJson += "\"" + *it + "\"" + ",";
			else
				users[i].MatchsJson += "\"" + *it + "\"";
		}
		users[i].MatchsJson += "]";
		std::cout << "INSERT INTO MatchaBDD.Users (username, lastname, firstname, email ,password, orientationId, bio, dms, age, locationX, locationY, tags, image, score, meLikeUsers, userLikesMe, matchs) VALUES (\"" << users[i].username << "\",\"" << users[i].lastname << "\",\"" << users[i].firstname << "\",\"" << users[i].email << "\",\"" << users[i].password << "\"," << users[i].orientationId << ",\"" << users[i].bio << "\",\"" << "[]" << "\"," << users[i].age << "," << users[i].locationX << "," << users[i].locationY << ",\"" << users[i].TagsJson << "\",\"" << users[i].image << "\"," << users[i].score << ",\"" << users[i].meLikeUsersJson << "\",\"" << users[i].userLikesMeJson << "\",\"" << users[i].MatchsJson << "\");" << std::endl;
		}
}

