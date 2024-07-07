/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./adminPickup.css";
import Sidebar from "./components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "./components/ui/card";

const AdminPickup = () => {
  return (
    <div className="flex">
      <Sidebar />
      <PickupMain />
    </div>
  );
};

const PickupMain = () => {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusValues, setStatusValues] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(null);

  useEffect(() => {
    mergeData();
  }, []);

  const fetchPickupData = async () => {
    try {
      const response = await fetch("https://bank-sampah-bersinar-2.onrender.com/api/user/pickups");
      if (!response.ok) {
        throw new Error("Gagal mengambil data pickup");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching pickup data:", error);
      throw error;
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch("https://bank-sampah-bersinar-2.onrender.com/api/user/users");
      if (!response.ok) {
        throw new Error("Gagal mengambil data user");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  const mergeData = async () => {
    try {
      const pickupData = await fetchPickupData();
      const userData = await fetchUserData();

      const mergedData = pickupData.map((pickup) => {
        const user = userData.find((user) => user._id === pickup.userId);
        return {
          ...pickup,
          firstName: user ? user.firstName : "Unknown",
          lastName: user ? user.lastName : "Unknown",
          status: pickup.status || "pending", // Default to "pending" if status is not set
        };
      });

      setPickups(mergedData);
    } catch (error) {
      console.error("Error merging data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const handleStatusChange = (id, value) => {
    setStatusValues((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (id) => {
    const data = pickups.find((pickup) => pickup._id === id);
    const status = statusValues[id] || data.status;

    console.log(`Submitting status for pickup ID: ${id} to ${status}`); // Log untuk memastikan nilai status

    const postData = {
      ...data,
      status,
    };

    const response = await fetch(`https://bank-sampah-bersinar-2.onrender.com/api/user/updatePickupStatus/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      console.log("Status updated successfully");
      setSubmitSuccess("Status updated successfully");
      setPickups((prevPickups) =>
        prevPickups.map((pickup) =>
          pickup._id === id ? { ...pickup, status } : pickup
        )
      );
    } else {
      console.error("Failed to update status");
      setSubmitSuccess("Failed to update status");
    }
  };

  return (
    <div className="h-screen flex-1 p-7 pickup-main-page" style={{ backgroundColor: "#FFFFFF" }}>
      <h1 className="text-2xl font-semibold ">Pickup</h1>
      <Card>
        <Table>
          <TableCaption>List of PickUp</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan="6">Loading...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan="6">{error}</TableCell>
              </TableRow>
            ) : pickups.length > 0 ? (
              pickups.map((pickup) => (
                <TableRow key={pickup._id}>
                  <TableCell>{pickup.firstName} {pickup.lastName}</TableCell>
                  <TableCell>{formatDate(pickup.createdAt)}</TableCell>
                  <TableCell>{pickup.phone}</TableCell>
                  <TableCell>{pickup.address}</TableCell>
                  <TableCell>
                    <select
                      value={statusValues[pickup._id] || pickup.status}
                      onChange={(e) => handleStatusChange(pickup._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="On the way">On the way</option>
                      <option value="Picked up">Picked up</option>
                    </select>
                  </TableCell>
                  <TableCell>
                    <button className="submit-button" onClick={() => handleSubmit(pickup._id)}>
                      Submit
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="6">No pickups found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {submitSuccess && <div className="submit-message">{submitSuccess}</div>}
      </Card>
    </div>
  );
};

export default AdminPickup;
