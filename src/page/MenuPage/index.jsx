import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCategoryRequest } from "./categorySlice";
import { formatToVND } from "../../utils/numberUtil";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { addToCart } from "./cartSlice";
import { hover } from "@testing-library/user-event/dist/hover";
import "./index.css";
import axios from "axios";
import { API_URL } from "../../utils/constant";
const MenuPage = () => {
  const dispatch = useDispatch();
  const listCategory = useSelector(
    (state) => state.categoryManage.listCategory
  );
  const [listFood, setListFood] = useState([]);
  useEffect(() => {
    axios.get(API_URL + "/categories/2").then((response) => {
      setListFood(response.data.foodList);
    });
    dispatch(getCategoryRequest());
  }, []);

  const handleOnChangeCate = (e) => {
    let eId = e !== 1 ? +e.target.value : 1;
    setListFood([]);
    listCategory.forEach((item) => {
      if (item.id === eId) {
        item.foodList.forEach((food) => {
          setListFood((prev) => [...prev, food]);
        });
      }
    });
  };

  useEffect(() => {
    if (listFood.length === 0) {
      handleOnChangeCate(1);
    }
  }, []);

  const handleAddtoCart = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <Box
      sx={{
        width: "100%",
        paddingLeft: "8px",
        paddingRight: "8px",
      }}
    >
      <Box sx={{ textAlign: "center", color: "#d83a3a", marginY: "18px" }}>
        <h2>THỰC ĐƠN</h2>
      </Box>
      <select
        style={{
          width: "100%",
          fontSize: "20px",
          margin: "10px 5px",
          color: "black",
        }}
        onChange={handleOnChangeCate}
      >
        {listCategory.map((item, index) => {
          return (
            <option key={item.id} value={item.id}>
              {item.categoryName}
            </option>
          );
        })}
      </select>

      <Box sx={{ width: "100%", marginBottom: "5px" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {listFood.map((item, index) => {
            return (
              <Grid item xs={6} key={`${item.id}`}>
                <Box
                  className="menu-item-container overlay"
                  onClick={() => handleAddtoCart(item)}
                >
                  <img style={styles.image} src={item.imgUrl} alt="" />
                  <Stack sx={styles.contentInfor}>
                    <Box
                      sx={{ fontSize: 18, marginBottom: "4px", height: "50px" }}
                    >
                      {item.foodName}
                    </Box>
                    <Stack
                      direction={"row"}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      Giá:
                      <Box
                        sx={{
                          marginLeft: "4px",
                          fontSize: 16,
                          color: "#d83a3a",
                        }}
                      >
                        {formatToVND(item.price)}đ
                      </Box>
                      <div className="button-cart">
                        <AddShoppingCartIcon
                          style={{
                            position: "absolute",
                            color: "#fff",
                            top: "5px",
                            right: "2px",
                          }}
                          // onClick={() => handleAddtoCart(item)}
                        />
                      </div>
                    </Stack>
                  </Stack>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};
const styles = {
  contentContainer: {
    backgroundColor: "#fbfbfb",
    margin: "4px ",
    borderRadius: "15px",
    boxShadow: 1,
    height: "220px",
    position: "relative",
  },
  image: {
    borderTopLeftRadius: "15px",
    borderTopRightRadius: "15px",
    display: "block",
    height: "120px",
    width: "100%",
    objectFit: "cover",
  },
  contentInfor: {
    // fontSize: "10px",
    margin: "10px",
    paddingBottom: "10px",
  },
  cartIcon: {
    padding: "10px",
    backgroundColor: "#d83a3a",
    width: "30px",
    height: "30px",
    position: "relative",
    borderRadius: "15px",
  },
};
export default MenuPage;
