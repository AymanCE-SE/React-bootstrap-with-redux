/** @format */

import React, { useEffect, useState } from "react";
import { Container, Table, Card, Badge } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { TiEye } from "react-icons/ti";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { deleteProduct, getAllProducts } from "../api/productapi";
import Swal from "sweetalert2";
import { deleteProductAction, getAllProductsAction } from "../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
const Products = () => {
  //action dispatch hook
  const dispatchAction = useDispatch();
  let [searchTerm, setSearchTerm] = useState("");

  const { products, isLoading, errors } = useSelector( store => store.productSlice )
  console.log(products);
  useEffect(() => {
    // dispatch an action to return all products
    dispatchAction(getAllProductsAction());
  }, []);
  // delete handler

  /**
   * deleteHandler: deletes a product with given productId
   * @param {string} productId - the id of the product to be deleted
   * @returns {Promise<void>}
   */
  const deleteHandler = async (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          dispatchAction(deleteProductAction(productId));
  
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
        } catch (error) {
          console.log(error);
          Swal.fire("Error!", "Something went wrong!", "error");
        }
      }
    });
  };
  
  // search filtation handler
  const filteredProducts = searchTerm
  ? products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : products;

  return (
    <Container className="my-4 ">
      <div className="container d-flex justify-content-between ">
        <Link to="0/edit" className="btn btn-outline-success p-2 ">
          Add New Product
        </Link>

        <input
          type="text"
          placeholder="Search Product"
          className="form-control w-50 col-6 p-1 "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          name="search"
        />
      </div>
      <div className="row ">
        <div className="col-12">
          <Card className="shadow-sm border-0 mt-3">
            <Card.Header className="bg-danger text-white border-radius-lg p-4 rounded-top-3 shadow">
              <h5 className="text-white text-capitalize ps-3 mb-0">
                Product Dashboard
              </h5>
            </Card.Header>
            <Card.Body className="px-0 pb-2">
              <div className="table-responsive p-0">
                {errors && (
                  <div className="mt-5 alert alert-danger">
                    {errors.message}
                  </div>
                )}
                {!isLoading && !errors && (
                  <Table responsive className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">
                          ID
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Image
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Product Name
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Category
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Stock
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Status
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Price
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                    {filteredProducts && filteredProducts.map((product) => (
                      <tr key={product.id}>
                          {" "}
                          <td className="align-middle">{product.id}</td>
                          <td>
                            <img
                              src= {product.img}
                              alt="product"
                              id="product-image"
                              className="avatar avatar-sm me-3"
                            />
                          </td>
                          <td className="align-middle">{product.name}</td>
                          <td className="align-middle">{product.category}</td>
                          <td className="align-middle text-center">
                            {product.quantity}
                          </td>
                          <td className="align-middle text-center">
                          { product.quantity > 0 ? <Badge className="fs-6 rounded-pill" bg="success">IN STOCK</Badge>
                          : <Badge bg="danger" className="fs-6 rounded-pill">OUT OF STOCK</Badge>  
                        }
                          </td>
                          <td className="align-middle text-center">
                            ${product.price}
                          </td>
                          <td className="align-middle text-center">
                            <div className="d-flex justify-content-evenly">
                              <Link
                                to={`${product.id}`}
                                className="text-info fs-4">
                                <TiEye />
                              </Link>
                              <Link
                                to={`${product.id}/edit`}
                                className="text-dark fs-4">
                                <FaRegEdit />
                              </Link>
                              <Link className="text-danger fs-4">
                                <MdDelete onClick={() => deleteHandler( product.id )}/>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default Products;
