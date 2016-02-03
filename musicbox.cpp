#include <vector>
#include <string>
#include <iostream>
#include <algorithm>
using namespace std;

class Book {
	public:
		string title;
		string author;
		bool read;
	public:
		void makeRead() {
			read = true;
		}
};

class Bookshelf {
	protected:
		vector<Book> shelf;
	public:
		void showShelf() {
			int i = 0;
			while (i != shelf.size()) {
				cout << shelf[i].title << endl;
				i++;
			}
			cout << "Total " << i << " books." << endl;
		}

		vector<int> findBook(string keyword) {
			vector<int> indices;
			vector<Book> result;

			for (int i = 0; i != shelf.size(); i++) {
    			if ((shelf[i].title.find(keyword) != string::npos) || (shelf[i].author.find(keyword) != string::npos)) {
    				indices.push_back(i);
    				result.push_back(shelf[i]);
    			}
			}

			if (result.size()==0)
				cout << "No books were found." << endl;
			else {
				cout << "Found:" << endl;
				for (int i = 0; i != result.size(); i++) {
					cout << "     " << result[i].title << endl;
				}
			}

			return indices;	
		}

		void addBook() {
			string title;
			string author;
			char read[1];

			cin.ignore();
			cout << "Please enter book title:" << endl;
			getline(cin, title);
			cout << "Please enter book author:" << endl;
			getline(cin, author);
			cout << "Please enter Y or N for book read or not:" << endl;
			cin >> read;

			while (read[0]!='Y' && read[0]!='N') {
				cout << "Please enter a valid input: " << endl;
				cout << "(type Y or N)" << endl;
				cin >> read;
			}

			Book newbook;
			newbook.title = title;
			newbook.author = author;
			if (read[0]=='Y')
				newbook.read = true;
			else
				newbook.read = false;

			shelf.push_back(newbook);
			cout << "Added book: " << newbook.title << endl;
		}

		void removeBook(string keyword) {
			vector<int> indices = findBook(keyword);
			char yesorno[1];

			if (indices.size()==0)
				cout << "No books were found." << endl;
			else {
				for (int i = 0; i != indices.size(); i++) {
					cout << "Do you want to remove: " << shelf[indices[i]].title << " ?" << endl;
					cout << "(type Y or N)" << endl;
					cin >> yesorno;

					while (yesorno[0]!='Y' && yesorno[0]!='N') {
						cout << "Please enter a valid input: " << endl;
						cout << "(type Y or N)" << endl;
						cin >> yesorno;
					}
					if (yesorno[0]=='Y') {
						shelf.erase(shelf.begin()+indices[i]);
						cout << "Book removed." << endl;
						break;
					}
				}
			}
		}
};

int main() {
	Bookshelf shelf;

	cout << endl;
	cout << "Current bookshelf: " << endl;
	shelf.showShelf();

	bool end = false;

	for(;;) {
		char choice[1];

		cout << endl;
		cout << "What would you like to do?" << endl;
		cout << "Type F to find book, S to show shelf, A to add book, R to remove book, E to end." << endl;
		cin >> choice;
		while (choice[0]!='F' && choice[0]!='S' && choice[0]!='A' && choice[0]!='R' && choice[0]!='E') {
			cout << "Please enter a valid input: " << endl;
			cout << "Type F to find book, S to show shelf, A to add book, R to remove book, E to end." << endl;
			cin >> choice;
		}

		if (choice[0]=='E')
			break;
		else if (choice[0]=='F') {
			string keyword;
			cout << endl;
			cin.ignore();
			cout << "Please enter a keyword to find the book: " << endl;
			getline(cin, keyword);

			shelf.findBook(keyword);
		}
		else if (choice[0]=='S') {
			cout << endl;
			cout << "Current bookshelf: " << endl;
			shelf.showShelf();
		}
		else if (choice[0]=='A') {
			cout << endl;
			shelf.addBook();
		}
		else if (choice[0]=='R') {
			string keyword;
			cout << endl;
			cin.ignore();
			cout << "Please enter a keyword to find the book: " << endl;
			getline(cin, keyword);

			shelf.removeBook(keyword);
		}

	}


	return 0;
}


