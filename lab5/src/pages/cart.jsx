import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import { editProductAction, getAllProductsAction } from '../store/productSlice';
import { FaTrash, FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalAmount } = useSelector((state) => state.cartSlice);
  const { products } = useSelector((state) => state.productSlice);

  const handleQuantityChange = (id, type) => {
    dispatch(updateQuantity({ id, type }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = async () => {
    Swal.fire({
      title: 'Confirm Checkout',
      text: `Total Amount: $${Number(totalAmount).toFixed(2)}`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Proceed to Checkout',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          for (const cartItem of cartItems) {
            const currentProduct = products.find(p => p.id === cartItem.id);
            if (currentProduct) {
              await dispatch(editProductAction({
                id: cartItem.id,
                product: {
                  ...currentProduct,
                  quantity: Number(currentProduct.quantity) - Number(cartItem.quantity)
                }
              }));
            }
          }
          
          await dispatch(getAllProductsAction());
          dispatch(clearCart());
          
          Swal.fire('Success!', 'Your order has been placed successfully!', 'success');
          navigate('/');
        } catch (error) {
          console.error('Checkout error:', error);
          Swal.fire('Error!', 'There was a problem processing your order.', 'error');
        }
      }
    });
  };

  if (cartItems.length === 0) {
    return (
      <Container className="my-5 text-center">
        <div className="empty-cart-container py-5">
          <FaShoppingCart size={60} className="text-muted mb-4" />
          <h2 className="mb-3">Your Cart is Empty</h2>
          <p className="text-muted mb-4">Looks like you haven't added any items to your cart yet.</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Continue Shopping
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4 custom-bgRed text-light p-4 text-center rounded ">Shopping Cart</h2>
      <Row>
        <Col lg={8}>
          <div className="cart-items">
            {cartItems.map((item) => {
              const itemTotalPrice = Number(item.price) * Number(item.quantity);
              
              return (
                <Card key={item.id} className="mb-3 border-0 shadow-sm">
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col xs={3} md={2}>
                        <img
                          src={item.img}
                          alt={item.name}
                          className="img-fluid rounded"
                          style={{ maxHeight: '80px', objectFit: 'contain' }}
                        />
                      </Col>
                      <Col xs={9} md={4}>
                        <h5 className="mb-1">{item.name}</h5>
                        <p className="text-muted mb-0">${Number(item.price).toFixed(2)}</p>
                      </Col>
                      <Col xs={6} md={3}>
                        <div className="d-flex align-items-center justify-content-center quantity-controls">
                          <Button
                            variant="light"
                            size="sm"
                            className="rounded-circle"
                            onClick={() => handleQuantityChange(item.id, 'decrease')}
                            disabled={Number(item.quantity) <= 1}
                          >
                            <FaMinus size={12} />
                          </Button>
                          <span className="mx-3 fw-bold">{item.quantity}</span>
                          <Button
                            variant="light"
                            size="sm"
                            className="rounded-circle"
                            onClick={() => handleQuantityChange(item.id, 'increase')}
                            disabled={Number(item.quantity) >= Number(item.availableQuantity)}
                          >
                            <FaPlus size={12} />
                          </Button>
                        </div>
                      </Col>
                      <Col xs={4} md={2} className="text-end">
                        <p className="fw-bold mb-0">${itemTotalPrice.toFixed(2)}</p>
                      </Col>
                      <Col xs={2} md={1} className="text-end">
                        <Button
                          variant="link"
                          className="text-danger p-0"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <FaTrash />
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </Col>
        <Col lg={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h4 className="mb-4">Order Summary</h4>
              <div className="d-flex justify-content-between mb-3">
                <span>Items ({cartItems.length}):</span>
                <span>${Number(totalAmount).toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping:</span>
                <span className="text-success">Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <span className="fw-bold">Total:</span>
                <span className="fw-bold fs-5">${Number(totalAmount).toFixed(2)}</span>
              </div>
              <Button 
                variant="outline-danger" 
                className="w-100"
                size="lg"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
              <Button 
                variant="link" 
                className="w-100 text-muted mt-2"
                onClick={() => navigate('/')}
              >
                Continue Shopping
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;