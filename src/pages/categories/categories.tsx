import React, { useState, useEffect } from "react";
import { HttpService } from "../../utils/axiosRequest";
import "./categories.styles.scss";
import { toast } from "react-toastify";
import { Modal } from "react-responsive-modal";
import { bookType, categoryType } from "./categories.types";
import SimpleButton from "../../components/simpleButton/SimpleButton";
import IconButton from "../../components/iconInput/IconInput";
import CategoriesIcon from "../../assets/icons/categories.png";
import "react-responsive-modal/styles.css";
import BookCard from "../../components/bookCard/BookCard";

const Categories: React.FC = () => {
  const [booksList, setBooksList] = useState<bookType[]>([]);
  const [modalBooksList, setModalBooksList] = useState<bookType[]>([]);
  const [categoriesList, setCategoriesList] = useState<categoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [toggleForForceUpdate, setToggleForForceUpdate] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isBooksModalOpen, setIsBooksModalOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      toast.warning("Please login for using app");
      setTimeout(() => {
        window.location.replace("/login");
      }, 2500);
    }
    HttpService.get("/books")
      .then((response: any) => {
        if (response.data) {
          const res = response.data;
          if (!res.hasError) {
            let array = res.payload;
            array.forEach((element: any) => {
              element.selected = false;
            });
            setBooksList(array);
          }
        }
      })
      .catch((err: any) => {
        if (err.response && err.response.data) {
          const res = err.response.data;
          if (res.hasError) {
            toast.error(res.message);
          }
        }
      });
  }, []);
  const addNewCategory = () => {
    var category = {
      title: newCategoryName,
      booksList: booksList,
      id: `newCategoryName ${Math.random() * 1000}`,
    };
    setCategoriesList((prev) => [...prev, category]);
    setNewCategoryName("");
    toast.success("Category added successfully");
  };
  const openModalFuction = (category: categoryType) => {
    setIsBooksModalOpen(true);
    setSelectedCategory(category.id);
    setModalBooksList(category.booksList);
    setToggleForForceUpdate(!toggleForForceUpdate);
  };
  const changeSelectedStatus = (bookId: string) => {
    var array = modalBooksList;
    array.forEach((element: any) => {
      if (element.id === bookId) element.selected = !element.selected;
    });
    setModalBooksList(array);
    setToggleForForceUpdate(!toggleForForceUpdate);
  };
  const closeBooksModal = () => {
    setIsBooksModalOpen(false);
    setSelectedCategory("");
  };
  const updateCategoryBookslist = () => {
    const categories = categoriesList.map((item) => {
      if (item.id === selectedCategory) {
        item.booksList = modalBooksList;
      }
      return item;
    });
    setCategoriesList(categories);
    setModalBooksList([]);
    setIsBooksModalOpen(false);
    setSelectedCategory("");
  };

  return (
    <div className="categories--container">
      <Modal open={isBooksModalOpen} onClose={closeBooksModal} center>
        <div className="books--list--modal__cards">
          {modalBooksList.map((book: bookType) => {
            return (
              <BookCard
                id={book.id}
                title={book.title}
                author={book.author}
                thumbnail={book.thumbnail}
                selected={book.selected}
                size="small"
                deleteButtonEnable={false}
                actionCallback={() => {
                  changeSelectedStatus(book.id);
                }}
              />
            );
          })}
        </div>
        <div className="books--list--modal__buttons">
          <SimpleButton text="Apply" onClick={updateCategoryBookslist} />
        </div>
      </Modal>
      <div className="categories--container--add">
        <div className="categories--container--add__actions">
          <span className="categories--container--add__actions--label">
            New Category Title
          </span>
          <IconButton
            onChange={(event: any) => setNewCategoryName(event.target.value)}
            label=""
            iconSrc={CategoriesIcon}
            name="newCategoryName"
            value={newCategoryName}
          />
          <SimpleButton text="Add" onClick={addNewCategory} />
        </div>
        <div className="categories--container--section">
          <div className="categories--container--section__list">
            <span className="categories--container--section__list--title">
              Categories List
            </span>
            {categoriesList.map((category: categoryType) => {
              return (
                <div
                  className="categories--container--section__list--item"
                  onClick={() => openModalFuction(category)}
                >
                  <span className="categories--container--section--list--item--title">{`Title:  ${category.title}`}</span>
                  <span className="categories--container--section--list--item--books">{`Number of books:  ${
                    category.booksList.filter((item) => item.selected).length
                  }`}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
