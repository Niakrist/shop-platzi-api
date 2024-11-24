import { Link } from "react-router-dom";
import styles from "../../styles//Product.module.css";
import { ROUTES } from "../../utils/routes";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/user/userSlice";

const SIZES = [4, 4.5, 5];

const Product = ({ id, images, title, price, description }) => {
  const [currentImage, setCurrentImage] = useState(null);
  const [currentSize, setCurrentSize] = useState(null);
  const dispatch = useDispatch();

  const handleClick = (data) => {
    dispatch(addToCart(data));
  };

  useEffect(() => {
    if (!images.length) return;
    setCurrentImage(images[0]);
  }, [images]);

  return (
    <section className={styles.product}>
      <div className={styles.images}>
        <div
          className={styles.current}
          style={{ backgroundImage: `url(${currentImage})` }}
        />
        <div className={styles["images-list"]}>
          {images.map((img, i) => (
            <div
              key={i}
              className={styles.image}
              style={{ backgroundImage: `url(${img})` }}
              onClick={() => setCurrentImage(img)}
            />
          ))}
        </div>
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.price}>{price} $</div>
        <div className={styles.color}>
          <span>Color: </span> Green
        </div>
        <div className={styles.sizes}>
          <span>Sizes: </span>
          <div className={styles.list}>
            {SIZES.map((size) => (
              <div
                key={size}
                onClick={() => setCurrentSize(size)}
                className={`${styles.size} ${
                  size === currentSize && styles.active
                }`}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
        <p className={styles.description}>{description}</p>
        <div className={styles.actions}>
          <button
            onClick={() =>
              handleClick({ images, title, price, description, id })
            }
            className={styles.add}
            disabled={!currentSize}
          >
            Add to cart
          </button>
          <button className={styles.favourite}>Add to favourite</button>
        </div>
        <div className={styles.bottom}>
          <div>19 people purchased</div>
          <Link to={ROUTES.HOME}>Find in a store</Link>
        </div>
      </div>
    </section>
  );
};

export default Product;
