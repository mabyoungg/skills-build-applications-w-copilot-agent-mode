/**
 * Seed the octofit_db database with test data.
 * 
 * Usage: npm run seed
 * 
 * This script creates sample users, teams, activities, leaderboard entries,
 * and workouts for testing the OctoFit Tracker application.
 */

import 'dotenv/config'
import mongoose from 'mongoose'
import { User } from '../models/User.js'
import { Team } from '../models/Team.js'
import { Activity } from '../models/Activity.js'
import { Leaderboard } from '../models/Leaderboard.js'
import { Workout } from '../models/Workout.js'

const databaseUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db'

async function seed() {
  try {
    // Connect to database
    console.log('Connecting to MongoDB...')
    await mongoose.connect(databaseUri)
    console.log('Connected to octofit_db')

    // Clear existing data
    console.log('Clearing existing collections...')
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ])

    // Create teams
    console.log('Creating teams...')
    const team1 = await Team.create({
      name: 'Alpha Squad',
      memberIds: [],
    })
    const team2 = await Team.create({
      name: 'Beta Brigade',
      memberIds: [],
    })
    console.log(`Created ${2} teams`)

    // Create users
    console.log('Creating users...')
    const users = await User.create([
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        teamId: team1._id,
      },
      {
        name: 'Bob Smith',
        email: 'bob@example.com',
        teamId: team1._id,
      },
      {
        name: 'Charlie Brown',
        email: 'charlie@example.com',
        teamId: team2._id,
      },
      {
        name: 'Diana Prince',
        email: 'diana@example.com',
        teamId: team2._id,
      },
      {
        name: 'Eve Davis',
        email: 'eve@example.com',
        teamId: team1._id,
      },
    ])
    console.log(`Created ${users.length} users`)

    // Update teams with member IDs
    await Team.updateOne({ _id: team1._id }, { memberIds: [users[0]._id, users[1]._id, users[4]._id] })
    await Team.updateOne({ _id: team2._id }, { memberIds: [users[2]._id, users[3]._id] })

    // Create activities
    console.log('Creating activities...')
    const activities = await Activity.create([
      {
        userId: users[0]._id,
        type: 'Running',
        durationMinutes: 45,
        notes: 'Morning jog in the park',
      },
      {
        userId: users[0]._id,
        type: 'Swimming',
        durationMinutes: 60,
        notes: 'Lap swimming at the pool',
      },
      {
        userId: users[1]._id,
        type: 'Cycling',
        durationMinutes: 90,
        notes: 'Mountain bike trail',
      },
      {
        userId: users[2]._id,
        type: 'Yoga',
        durationMinutes: 30,
        notes: 'Morning yoga session',
      },
      {
        userId: users[3]._id,
        type: 'Weight Training',
        durationMinutes: 75,
        notes: 'Full body workout',
      },
      {
        userId: users[4]._id,
        type: 'Running',
        durationMinutes: 30,
        notes: 'Evening run',
      },
    ])
    console.log(`Created ${activities.length} activities`)

    // Create leaderboard entries
    console.log('Creating leaderboard entries...')
    const leaderboardEntries = await Leaderboard.create([
      {
        teamId: team1._id,
        score: 2850,
      },
      {
        teamId: team2._id,
        score: 2100,
      },
    ])
    console.log(`Created ${leaderboardEntries.length} leaderboard entries`)

    // Create workouts
    console.log('Creating workouts...')
    const workouts = await Workout.create([
      {
        userId: users[0]._id,
        title: 'Morning Run Challenge',
        completedAt: new Date('2026-06-10T07:00:00Z'),
      },
      {
        userId: users[0]._id,
        title: 'Cardio Burst',
        completedAt: new Date('2026-06-11T06:30:00Z'),
      },
      {
        userId: users[1]._id,
        title: 'Trail Ride',
        completedAt: new Date('2026-06-10T16:00:00Z'),
      },
      {
        userId: users[2]._id,
        title: 'Flexibility Training',
        completedAt: new Date('2026-06-11T08:00:00Z'),
      },
      {
        userId: users[3]._id,
        title: 'Strength Builder',
        completedAt: new Date('2026-06-10T18:00:00Z'),
      },
      {
        userId: users[4]._id,
        title: 'Evening Fitness',
        completedAt: new Date('2026-06-11T19:00:00Z'),
      },
    ])
    console.log(`Created ${workouts.length} workouts`)

    console.log('\n✓ Database seeding completed successfully!')
    console.log(`
Summary:
- Teams: ${2}
- Users: ${users.length}
- Activities: ${activities.length}
- Leaderboard Entries: ${leaderboardEntries.length}
- Workouts: ${workouts.length}
    `)

    await mongoose.disconnect()
    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    await mongoose.disconnect()
    process.exit(1)
  }
}

seed()
