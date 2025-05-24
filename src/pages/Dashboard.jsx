import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  FileText, 
  User, 
  Phone,
  Mail,
  MapPin,
  Plus
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';

const Dashboard = () => {
  const { user } = useAuth();

  const upcomingAppointments = [
    {
      id: 1,
      service: 'Dental Checkup',
      date: '2024-01-15',
      time: '10:00 AM',
      doctor: 'Dr. Subha Sharma',
      status: 'confirmed'
    },
    {
      id: 2,
      service: 'Teeth Cleaning',
      date: '2024-02-20',
      time: '2:00 PM',
      doctor: 'Dr. Rajesh Kumar',
      status: 'pending'
    }
  ];

  const recentTreatments = [
    {
      id: 1,
      service: 'Dental Filling',
      date: '2023-12-10',
      doctor: 'Dr. Subha Sharma',
      status: 'completed'
    },
    {
      id: 2,
      service: 'Scaling & Polishing',
      date: '2023-11-15',
      doctor: 'Dr. Priya Patel',
      status: 'completed'
    }
  ];

  const quickStats = [
    { label: 'Total Appointments', value: '12', icon: Calendar },
    { label: 'Completed Treatments', value: '8', icon: FileText },
    { label: 'Upcoming Visits', value: '2', icon: Clock },
    { label: 'Years as Patient', value: '3', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's an overview of your dental care journey with us.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {quickStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upcoming Appointments */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Upcoming Appointments
                  </h2>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Book New
                  </Button>
                </div>
              </div>
              <div className="p-6">
                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                            <Calendar className="h-6 w-6 text-primary-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {appointment.service}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {appointment.date} at {appointment.time}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-500">
                              with {appointment.doctor}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            appointment.status === 'confirmed'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      No upcoming appointments
                    </p>
                    <Button className="mt-4">
                      Schedule Your Next Visit
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Treatments */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 mt-8">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Recent Treatments
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentTreatments.map((treatment) => (
                    <div
                      key={treatment.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                          <FileText className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {treatment.service}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {treatment.date}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-500">
                            by {treatment.doctor}
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        {treatment.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile & Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Profile Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
              <div className="p-6">
                <div className="text-center">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {user?.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Patient since 2021
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {user?.email}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      +977-9876543210
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Kathmandu, Nepal
                    </span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  Edit Profile
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    View Medical History
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Clinic
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
