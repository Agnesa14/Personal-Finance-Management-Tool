import React, { useState } from 'react';
import './QuickActionModal.css';
import { useNavigate } from 'react-router-dom';
import AddExpenseModal from './AddExpenseModal';
import AddIncomeModal from './AddIncomeModal';

const QuickActionModal = ({ onClose }) => {
const navigate = useNavigate();
const [showExpenseModal, setShowExpenseModal] = useState(false);
const [showIncomeModal, setShowIncomeModal] = useState(false);
const handleIncome = () => {
setShowIncomeModal(true);
};

const handleExpense = () => {
setShowExpenseModal(true);

};
return (
<div className="modal-overlay">
<div className="modal-content">
<h3>Zgjedh Veprimin</h3>
<button onClick={handleIncome} className="modal-btn income">+ Shto të
ardhura</button>
<button onClick={handleExpense} className="modal-btn expense">+ Shto
shpenzim</button>
<button onClick={onClose} className="modal-close">Mbyll</button>
</div>
{/* Modal për Shto Shpenzim */}
{showExpenseModal && <AddExpenseModal onClose={() =>
setShowExpenseModal(false)} />}
{showIncomeModal && <AddIncomeModal onClose={() =>
setShowIncomeModal(false)} />}
</div>
);
};
export default QuickActionModal;